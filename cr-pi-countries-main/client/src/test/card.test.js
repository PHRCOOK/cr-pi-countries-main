
import React from 'react';
import * as router from 'react-router'
import { render, fireEvent,screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from '../components/card/card';

const navigate = jest.fn()
beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  describe('Card', () => {
    it('should render correctly', () => {
      const { container } = render(
        <MemoryRouter>
          <Card id={"ARG"} name={"Argentina"} image={"flag.png"} continent={"America"} />
        </MemoryRouter>
      );
      expect(container).toMatchSnapshot();
    });
  
    it('should render props correctly', () => {
      render(
        <MemoryRouter>
          <Card id={"ARG"} name={"Argentina"} image={"flag.png"} continent={"America"}/>
        </MemoryRouter>
      );
      expect(screen.getByText(/Argentina/i).textContent).toBe("Argentina")
      expect(screen.getByAltText(/bandera/i).getAttribute("src")).toBe("flag.png")
      expect(screen.getByText(/America/i).textContent).toBe("America")
    });
  
  it('should call navigate on click', () => {
    render(
      <MemoryRouter>
        <Card id={"ARG"} name={"Argentina"} navigate={navigate} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('dialog'));
    expect(navigate).toHaveBeenCalledWith('/detail/ARG');
  });
});
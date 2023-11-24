import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Card from "../components/Card/card";

describe("Card component", () => {
  it("displays the correct content", () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <Card
          id="1"
          image="test.jpg"
          name="Test Name"
          continent="Test Continent"
        />
      </MemoryRouter>
    );

    expect(getByRole("dialog")).toBeInTheDocument();
    expect(getByText("Test Name")).toBeInTheDocument();
    expect(getByText("Test Continent")).toBeInTheDocument();
  });

  it("renders the image with the correct src", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Card
          id="1"
          image="test.jpg"
          name="Test Name"
          continent="Test Continent"
        />
      </MemoryRouter>
    );

    const image = getByRole("img");
    expect(image).toHaveAttribute("src", "test.jpg");
  });

  it("does not render if no name is provided", () => {
    const { queryByRole } = render(
      <MemoryRouter>
        <Card id="1" image="test.jpg" name="" continent="Test Continent" />
      </MemoryRouter>
    );

    const dialog = queryByRole("dialog");
    expect(dialog).not.toBeInTheDocument();
  });

  it("renders correctly if a name is provided", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Card
          id="1"
          image="test.jpg"
          name="Test Name"
          continent="Test Continent"
        />
      </MemoryRouter>
    );

    const dialog = getByRole("dialog");
    expect(dialog).toBeInTheDocument();
  });
});

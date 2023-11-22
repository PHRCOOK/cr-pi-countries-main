const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('id', () => {
      it('should throw an error if id is null', (done) => {
        Country.create({
          id: null,
          name: "Argentina",
          flag: "https://flagcdn.com/w320/ar.png",
          continent: "Americas",
          population: 45376763
        })
          .then(() => done(new Error('It requires a valid id')))
          .catch(() => done());
      });
      it('should throw an error if id is nota a cca3 code', (done) => {
        Country.create({
          id: "abcd",
          name: "Argentina",
          flag: "https://flagcdn.com/w320/ar.png",
          continent: "Americas",
          population: 45376763
        })
          .then(() => done(new Error('It requires a valid cca3 code id')))
          .catch(() => done());
      });
    }),
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({
          id: "ARG",
          name: null,
          flag: "https://flagcdn.com/w320/ar.png",
          continent: "Americas",
          population: 45376763
        })
          .then(() => done(new Error('It requires a not null name')))
          .catch(() => done());
      });
    }),
    describe('flag', () => {
      it('should throw an error if flag is null', (done) => {
        Country.create({
          id: "ARG",
          name: "Argentina",
          flag: null,
          continent: "Americas",
          population: 45376763
        })
          .then(() => done(new Error('It requires a not null value')))
          .catch(() => done());
      });
    }),
    describe('continent', () => {
      it('should throw an error if continent is null', (done) => {
        Country.create({
          id: "ARG",
          name: "Argentina",
          flag: "https://flagcdn.com/w320/ar.png",
          continent: null,
          population: 45376763
        })
          .then(() => done(new Error('It requires a not null value')))
          .catch(() => done());
      });
    }),
    describe('population', () => {
      it('should throw an error if population is null', (done) => {
        Country.create({
          id: "ARG",
          name: "Argentina",
          flag: "https://flagcdn.com/w320/ar.png",
          continent: "Americas",
          population: null
        })
          .then(() => done(new Error('It requires a not null value')))
          .catch(() => done());
      });
      it('should throw an error if population is not a number', (done) => {
        Country.create({
          id: "ARG",
          name: "Argentina",
          flag: "https://flagcdn.com/w320/ar.png",
          continent: "Americas",
          population: "null"
        })
          .then(() => done(new Error('It requires a number')))
          .catch(() => done());
      });
    }),
    describe('country', () => {
      it('should work when its a valid data country', () => {
        Country.create({
        id: "ARG",
        name: "Argentina",
        flag: "https://flagcdn.com/w320/ar.png",
        continent: "Americas",
        population: "45376763"});
      });
    });
  });
});

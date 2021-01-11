const request = require('supertest');
const faker = require('faker');
const app = require('../app.js');
const Events = require('../models/events.js');
const {createUser} = require('../models/users.js');
const {createAddress} = require('../models/adress.js')
const {postOneWine} = require('../models/wine.js');

const getValidEventAttributes = () => {
  return {
    date: '2020-01-04',
    title: faker.lorem.sentence(),
    price: faker.commerce.price(),
    description: faker.lorem.paragraph(),
    moderator_id: 1,
    duration_seconds: faker.random.number(),
    main_picture_url: faker.image.imageUrl(),
    address_id: 1,
    wine_id: 1
  };
};

const createEventRecord = (attributes) =>
  Events.createEvent(attributes || getValidEventAttributes());

const createUserRecord = () => {
  const password = faker.internet.password();
  return createUser({
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password,
    password_confirmation: password,
});
}

const createWineRecord = () => {
  return postOneWine({
    name: faker.commerce.productName(),
    vigneron: faker.name.firstName(),
    cepage: faker.lorem.word(),
    arome: faker.lorem.word(),
    price: faker.commerce.price(),
    sommelier: faker.name.lastName(),
    image: faker.image.imageUrl(),
    website: faker.internet.url(),
    specificities: faker.lorem.sentence(),
    producteur: faker.name.firstName(),
})
}

const createAddressRecord = () => {
  return createAddress({
    body: {
    street: faker.address.streetAddress(),
    zipcode: faker.address.zipCode(),
    city: faker.address.city(),
  }
})
};

const createWineUserAddress = async () => {
  await createWineRecord();
  await createUserRecord();
  await createAddressRecord();
}

let res;
let testedEntity;
let attributes;

describe(`events endpoints`, () => {
  describe(`GET /events`, () => {
    describe('when there are two items in DB', () => {
      beforeEach(async () => {
        await createWineUserAddress()
        await Promise.all([createEventRecord(), createEventRecord()]);
        res = await request(app).get('/events');
      });
      it('status is 200', async () => {
        expect(res.status).toBe(200);
      });

      it('the returned body is an array containing two elements', async () => {
        expect(Array.isArray(res.body));
        expect(res.body.length).toBe(2);
      });

      it('the returned elements have expected properties', async () => {
        const expectedProps = ['id', 'date', 'moderator_id', 'main_picture_url', 'address_id'];
        res.body.forEach((element) => {
          expectedProps.forEach((prop) => {
            expect(element[prop]).not.toBe(undefined);
          });
        });
      });
    });
  });
    describe(`POST /events`, () => {
      describe('without request body', () => {
        beforeAll(async () => {
          await createWineUserAddress()
          res = await request(app).post(`/events`);
        });

        it('returns 400 status', async () => {
          expect(res.statusCode).toEqual(400);
        });
      });
    describe('when valid datas are sent', () => {
      beforeAll(async () => {
        attributes = getValidEventAttributes();
        await createWineUserAddress()
        res = await request(app).post(`/events`).send(attributes);
      });

      it('returns 201 status', async () => {
        expect(res.statusCode).toEqual(201);
      });

      it('returns the id of the created event', async () => {
        expect(res.body).toHaveProperty('id');
      });
    });
    describe('when just title is provided', () => {
      beforeAll(async () => {
        await createWineUserAddress()
        res = await request(app).post(`/events`).send({
          title: faker.lorem.sentence(),
        });
      });

      it('returns a 422 status', async () => {
        expect(res.status).toBe(422);
      });

      it('returns an error message', async () => {
        expect(res.body).toHaveProperty('errorMessage');
      });
    });
    describe('when an invalid date is provided', () => {
      beforeAll(async () => {
        attributes = getValidEventAttributes();
        await createWineUserAddress()
        const datasWithInvalidDate = {...attributes, date: 'invalid date'}
        res = await request(app).post(`/events`).send(datasWithInvalidDate);
      });

      it('returns a 422 status', async () => {
        expect(res.status).toBe(422);
      });

      it('returns an error message', async () => {
        expect(res.body).toHaveProperty('errorMessage');
      });
    });

    describe("when description isn't provided", () => {
      beforeAll(async () => {
        attributes = getValidEventAttributes();
        delete attributes.description;
        await createWineUserAddress()
        res = await request(app).post(`/events`).send(attributes);
      });

      it('returns a 422 status', async () => {
        expect(res.status).toBe(422);
      });

      it('retuns an error message', async () => {
        expect(res.body).toHaveProperty('errorMessage');
      });
    });
  });
  describe(`PUT /events/:id`, () => {

    describe('without request body', () => {
      beforeAll(async () => {
        await createWineUserAddress()
        testedEntity = await createEventRecord();
        res = await request(app).put(
          `/events/${testedEntity.id}`
        );
      });

      it('returns 400 status', async () => {
        expect(res.statusCode).toEqual(400);
      });
    });
    describe("when price isn't provided", () => {
      beforeAll(async () => {
        await createWineUserAddress()
        testedEntity = await createEventRecord();
        attributes = getValidEventAttributes();
        delete attributes.price
        res = await request(app)
          .put(`/events/${testedEntity.id}`)
          .send(attributes);
      });

      it('returns a 422 status', async () => {
        expect(res.status).toBe(422);
      });
    });
    describe('with a valid entity', () => {
      beforeAll(async () => {
        await createWineUserAddress()
        testedEntity = await createEventRecord();
        attributes = getValidEventAttributes();
        res = await request(app)
          .put(`/events/${testedEntity.id}`)
          .send(attributes);
      });

      it('returns 200', () => {
        expect(res.status).toBe(200);
      });

      it('returns the entity with correct properties', () => {
        expect(res.body.id).toBe(testedEntity.id);
        expect(res.body.description).toBe(attributes.description);
      });
    });
    describe('with an non-existing entity id', () => {
      beforeAll(async () => {
        res = await request(app)
          .put(`/events/99999999`)
          .send(getValidEventAttributes());
      });

      it('returns 404', () => {
        expect(res.status).toBe(404);
      });
    });
  });
  describe(`DELETE /events/:id`, () => {
    describe('with a valid entity', () => {
      beforeAll(async () => {
        await createWineUserAddress()
        const event = await createEventRecord();
        res = await request(app).delete(`/events/${event.id}`);
      });

      it('returns 204', () => {
        expect(res.status).toBe(204);
      });
    });
    describe('with an non-existing entity id', () => {
      beforeAll(async () => {
        res = await request(app).delete(`/events/99999999`);
      });

      it('returns 404', () => {
        expect(res.status).toBe(404);
      });
    });
  });
});
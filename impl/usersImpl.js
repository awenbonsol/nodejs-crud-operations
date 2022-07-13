import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import { json } from 'express';

let users = [];

export const getUsers = (req, res) => {

    res.send({
        description: "success",
        data: users
    });
};

export const createUser = async (req, res) => {

    const user = req.body;

    const userWithId = { ...user, id: uuidv4() };

    users.push(userWithId);

    await fs.mkdir("logs", { recursive: true });
    await fs.writeFile(`logs/${userWithId.id}.txt`, JSON.stringify(userWithId));

    res.send(
        {
            description: "success",
            data: `The user with the name of ${user.firstName} was added!`
        }
    );
};

export const getUser = (req, res) => {
    // use the line below if for passing the value directly on the url
    // const { id } = req.params;

    let id = req.query.id;

    const user = users.find((user) => user.id === id);

    res.send({
        description: "success",
        data: user
    });
};

export const updateUser = (req, res) => {
    // use the line below if for passing the value directly on the url
    // const { id } = req.params;
    const { firstName, lastName, age, id } = req.body;

    const user = users.find((user) => user.id === id);

    if (firstName) {
        user.firstName = firstName;
    }

    if (lastName) {
        user.lastName = lastName;
    }

    if (age) {
        user.age = age;
    }

    res.send({
        description: "success",
        data: `The user with the id of ${id} was updated!`
    });
};

export const deleteUser = (req, res) => {
    // use the line below if for passing the value directly on the url
    // const { id } = req.params; 
    let id = req.query.id;

    users = users.filter((user) => user.id !== id);

    res.send(
        {
            description: "success",
            data: `The user with id of ${id} is removed from the list.`
        }
    );
};


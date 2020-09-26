const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports = {
    async register(request, response)  {
        const { email } = request.body;

        if (await User.findOne({ email })) {
            return response.status(400).send({ error: 'User already exists'});
        }


        try {
            const user = await User.create(request.body);
        
            user.password = undefined;

            return response.json(user);
        } catch(err) {
            return response.status(400).json({error: `${err}`})
        }
    },

    async authenticate(request, response) {
        const {email, password} = request.body;
        const user = await User.findOne({ email }).select('+password');

        try {

            if (!user || !await bcrypt.compare(password, user.password)) 
                return response.status(400).json({ error: 'Invalid email or password'});
            
            user.password = undefined;
            
            return response.json({user});
        } catch(err) {

            return response.json({error: `${err}`})
            
        }

    }
};
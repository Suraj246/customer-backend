import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
const app = express()

const port = 5000

mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://data:gIa8C5R7aHGHvybw@cluster0.ro8nvwy.mongodb.net/interview?retryWrites=true&w=majority')
    .then((res) => console.log('> Connected...'))
    .catch(err => console.log(`> Error while connecting to mongoDB : ${err.message}`))

app.use(cors())
app.use(express.json());

const schema = new mongoose.Schema({
    customer: String,
    email: String,
    city: String,
    image: String,
})
const User = mongoose.model('User', schema)

app.post("/api/create", async (req, res) => {
    const { city, } = req.body;
    const { customer, email } = req.body.input;
    console.log("req", req.body.input)

    const emailRegexp = new RegExp(
        /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
    )
    const checkEmailFormate = emailRegexp.test(email)

    const images = {
        Bangalore: 'https://img.traveltriangle.com/blog/wp-content/uploads/2020/01/places-to-visit-in-Bangalore-in-June1.jpg',
        Hydrabad: 'https://www.hlimg.com/images/stories/738X538/mattress-in-hyderabad_1547551233-175e.jpg?w=800&dpr=1.0',
        Delhi: 'https://media.istockphoto.com/photos/amazing-view-on-the-taj-mahal-in-sunset-light-with-reflection-in-the-picture-id1208049833?k=20&m=1208049833&s=170667a&w=0&h=3C4GAmhDQ2UNiHTl8qv8iCSfBvxs1hT0exOTwcTJcrI=',
        Mumbai: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Gateway_of_India_at_night.jpg'
    }
    try {
        if (checkEmailFormate === true) {
            console.log('success')
        }
        else {
            console.log("Invalid email")
            return res.status(400).json({ message: false })
        }

        const userExit = await User.findOne({ email: email });

        if (userExit) {
            return res.status(409).json({ message: "user already exits" });
        }
        if (city === 'Bangalore') {
            var user = new User({ customer, email, city, image: images.Bangalore });
        }
        if (city === 'Delhi') {
            var user = new User({ customer, email, city, image: images.Delhi });
        }
        if (city === 'Mumbai') {
            var user = new User({ customer, email, city, image: images.Mumbai });
        }
        if (city === 'Mumbai') {
            var user = new User({ customer, email, city, image: images.Mumbai });
        }
        if (city === 'Hydrabad') {
            var user = new User({ customer, email, city, image: images.Hydrabad });
        }
        if (city === '') {
            var user = new User({ customer, email, city: "no city", image: '' });
        }

        // console.log(user.city)

        const newUser = await user.save();
        if (newUser) {
            return res.status(201).json({ success: "user successfully created" });
        }
    } catch (err) {
        return res.status(422).json({ message: "error" });
    }
});
app.get('/', async (req, res) => {

    try {
        const products = await User.find({});
        res.status(200).json({ products })
    } catch (error) {
        res.status(500).json({ error: error })
    }

})
app.delete('/delete/:id', async (req, res) => {

    try {
        const products = await User.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ products })
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

app.listen(port, () => console.log('> Server is up and running on port : http://localhost:' + port))

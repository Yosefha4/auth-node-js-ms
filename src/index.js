import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import authRoute from './routes/authRoute.js';
import cors from 'cors';
import UserModel from './models/UserModel.js';

dotenv.config();

const app = express()

app.use(express.json());
app.use(cors());


const port = process.env.PORT || 8082;

app.use("/api/auth",authRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login', async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return next("404 , User not found!");
    else{
      res.status(202).json({"message":"The user email found correct!"})
    }

    // const isCorrect = await bcrypt.compare(req.body.password, user.password);

    // if (!isCorrect) return next("400, Wrong Credentials!");

    // const token = jwt.sign({ id: user._id }, "7sd3%&*(accdv23d6sf@#vds2");
    // const { password, ...others } = user._doc;

    // res.cookie("access_token", token, { httpOnly: true });

    // res.status(200).json({ others: others, token: token });
  } catch (err) {
    next(err);
  }
})



mongoose.connect(process.env.MONGO_URL ,()=>{
    console.log("DB Connected")
})

app.listen(port, () => {
  console.log(`Auth Service listening on port ${port}`)
})

export {app} ;
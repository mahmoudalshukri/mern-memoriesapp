import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(!existingUser) return res.status(404).json({message: 'User Dose Not Exist.'});
        const isPasswordCorrect = await  bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(404).json({message: 'Invalid Credntials.'});
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id,}, 'test', { expiresIn: '1h'});
        res.status(200).json({ result: existingUser, token});
    } catch (error) {
        res.status(500).json({ message: 'Somthing Went Wrong.'});
    }
}

// export const signin = async (req, res) => {
//     const { email, password } = req.body
//     try {
//       const existingUser = await User.findOne({ email })
  
//       // Actually wrong error or password should be return same message text for more security.
//       if (!existingUser)
//         return res.status(404).json({ message: "User doesn't exist." })
  
//       const isPasswordCorrect = bcrypt.compare(password, existingUser.password)
  
//       if (!isPasswordCorrect)
//         return res.status(400).json({ message: 'Invalid credentials' })
  
//       const token = jwt.sign(
//         { email: existingUser.email, id: existingUser._id },
//         'secret_text_getting_from_secret_env_or_somewhere_else',
//         { expiresIn: '1h' }
//       )
  
//       return res.status(200).json({ result: existingUser, token })
//     } catch (error) {
//       return res.status(500).json({ message: 'Something went wrong!' })
//     }
//   }

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    try {
        const existingUser = await User.find({ email });
        if(!existingUser) return res.status(400).json({ message: 'User Already Exist.' });
        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords Don't Match." });
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h'});
        return res.status(200).json({ result, token});
    } catch (error) {
        return res.status(500).json({ message: 'Somthing Went Wrong.'});
    }
}


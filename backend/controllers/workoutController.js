const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')
//Encryption Stuff
let crypto = require('crypto');
let key = "abcdefghijklmnopqrstuvwx";

function encrptify(pt) {
  let encrypt = crypto.createCipheriv('des-ede3', key, "");
  let theCipher = encrypt.update(pt, 'utf8', 'base64');
  theCipher += encrypt.final('base64');
  return theCipher;
};
function decryptify(theCipher) {
  let decrypt = crypto.createDecipheriv('des-ede3', key, "");
  let s = decrypt.update(theCipher, 'base64', 'utf8');
  s += decrypt.final('utf8');
  // console.log(s);
  return s;
}

// get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id

  let workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })
  // console.log(workouts[0])
  // workouts[0].load = decryptify(workouts[0].load);

  for (let i = 0; i < workouts.length; i++) {
    workouts[i].load = decryptify(workouts[i].load)
  }

  res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  let workout = await Workout.findById(id)

  if (!workout) {
    return res.status(404).json({ error: 'No such workout' })
  }
  workout.load = decryptify(workout.load);
  res.status(200).json(workout)
}


// create new workout
const createWorkout = async (req, res) => {
  let { title, load, reps } = req.body
  load = encrptify(load);
  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const workout = await Workout.create({ title, load, reps, user_id })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  const workout = await Workout.findOneAndDelete({ _id: id })

  if (!workout) {
    return res.status(400).json({ error: 'No such workout' })
  }

  res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  const workout = await Workout.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!workout) {
    return res.status(400).json({ error: 'No such workout' })
  }

  res.status(200).json(workout)
}


module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}
const Game = require('../models/game.model');

exports.createGame = async (req, res) => {
  try {
    const { name } = req.body;
    const existingGame = await Game.findOne({ name });
    if (existingGame) {
      return res.status(400).send('Game already exists');
    }
    const newGame = new Game({ name });
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).send('Error creating game');
  }
};

exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).send('Error fetching games');
  }
};

exports.updateGame = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!updatedGame) {
      return res.status(404).send('Game not found');
    }
    res.json(updatedGame);
  } catch (error) {
    res.status(500).send('Error updating game');
  }
};

exports.deleteGame = async (req, res) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    if (!deletedGame) {
      return res.status(404).send('Game not found');
    }
    res.json(deletedGame);
  } catch (error) {
    res.status(500).send('Error deleting game');
  }
};

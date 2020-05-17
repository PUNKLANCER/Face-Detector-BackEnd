const Clarifai = require ('Clarifai');

const app = new Clarifai.App({
 apiKey: '46badaa23880425ca1ca3d5a710b49e9'
});

const handleApiCall = (req,res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with api'))
}

const handleImagePut = (req,res,db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	 .increment('entries', 1)
	 .returning('entries')
	 .then(entries => {
	 	res.json(entries[0]);
	 })
	 .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImagePut: handleImagePut,
  handleApiCall : handleApiCall
}
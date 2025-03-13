import mongoose, {Schema, model, models} from 'mongoose'

const LocationSchema = new mongoose.Schema({
	street: {type: String},
	city: {type: String},
	state: {type: String}, // เพิ่ม field "state"
	zipcode: {type: String},

})

const PropertySchema = new Schema({
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	name: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	location: LocationSchema,
	beds: {
		type: Number,
		required: true
	},
	baths: {
		type: Number,
		required: true
	},
	square_feet: {
		type: Number,
		required: true
	},
	amenities: [
		{
			type: String
		}
	],
	rates: {
		nightly: {
			type: Number
		},
		weekly: {
			type: Number
		},
		monthly: {
			type: Number
		}
	},
	seller_info: {
		name: {
			type: String
		},
		email: {
			type: String
		},
		phone: {
			type: String
		}
	},
	images: [
		{
			type: String
		}
	],
	is_featured: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
})

const Property = models.Property || model('Property', PropertySchema)

export default Property;

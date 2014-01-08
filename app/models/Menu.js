var mongoose = require('mongoose'),
    utils = require('../../lib/utils'),
    Schema = mongoose.Schema;

var MenuSchema = new Schema({
    date: String,
    dining_halls: {
        atwater: {
            breakfast: { type: [], default: '', trim: true },
            lunch: { type: [], default: '', trim: true }
        },
        proctor: {
            breakfast: { type: [], default: '', trim: true },
            lunch: { type: [], default: '', trim: true },
            dinner: { type: [], default: '', trim: true }
        },
        ross: {
            breakfast: { type: [], default: '', trim: true },
            lunch: { type: [], default: '', trim: true },
            dinner: { type: [], default: '', trim: true }
        },
        language_tables: {
            lunch: { type: [], default: '', trim: true }
        }
    }
});

mongoose.model('Menu', MenuSchema);
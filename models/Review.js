const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    _id: Number,
    approvedByUsrId: String,
    createDt: String,
    lastModDt: String,
    submitDt: String,
    refVal: String,
    usrId: String,
    vendorDTO: Schema.Types.Mixed,
    reviewStatusCat: Schema.Types.Mixed,
    section: Schema.Types.Mixed,
    reviewValuesMap: Schema.Types.Mixed,
    companyName: String,
    companySizeCode: Number,
    jobTitle: String,
    email: String,
    industryCode: Number,
    jobRoleId: Number,
    itSizeId: String,
    refuser: String,
    jobRoleDesc: String,
    itSizeDesc: String,
    companySizeDesc: String,
    industryName: String,
    isAggregated: Boolean,
    hasBeenPublished: Boolean,
    autoRejectReasonList: Boolean,
    surveyId: String,
    gcEligible: String,
    gcSentStatus: String,
    rewardEarned: String,
    rewardAmount: Number,
    rewardCurrency: String,
    giftCardType: String,
    applyAvailableIncentive: Boolean,
    sourceType: String,
    moderationScore: Number,
}, { _id: false }   )

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
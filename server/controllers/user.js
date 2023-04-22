import User from "../models/user.js";

export const income_car_filter = async (req, res) => {
  try{
    const { income, car } = req.body;
    const page = req.query.page || 1;
    const items_per_page = process.env.ITEMS_PER_PAGE;

    const users = await User.find({
      '$and': [
        {income: { '$lt': income }},
        {car: { '$in': car }}
      ]
    })
      .skip((page - 1) * items_per_page) //skip these number of records in the beginning
      .limit(items_per_page);

    const totalItems = await User.find({
      '$and': [
        {income: { '$lt': income }},
        {car: { '$in': car }}
      ]
    }).countDocuments();

    res.status(200).json({
      users: users,
      metaData: {
        totalItems,
        items_per_page,
        page
      }
    })
  } catch (err) {
    res.status(404).json({
      message: err.message
    });
  }
}

export const gender_phone_filter = async (req, res) => {
  try {
    const { gender, phone_price } = req.body
    const page = req.query.page || 1;
    const items_per_page = process.env.ITEMS_PER_PAGE;

    const users = await User.find({
      '$and': [
        {gender: { $regex: `^${gender}`, $options: 'i' } },
        {phone_price: { '$gt': phone_price }}
      ]
    }).skip((page - 1) * items_per_page) //skip these number of records in the beginning
      .limit(items_per_page);

    const totalItems = await User.find({
      '$and': [
        {gender: { $regex: `^${gender}`, $options: 'i' } },
        {phone_price: { '$gt': phone_price }}
      ]
    }).countDocuments();

    res.status(200).json({
      users,
      totalUsers: users.length,
      metaData: {
        totalItems,
        items_per_page,
        page
      }
    })
  } catch (err) {
    res.status(404).json({
      message: err.message
    })
  }
}

export const name_email_filter = async (req, res) => {
  try {
    const { startsWith, quoteLength } = req.body
    const page = req.query.page || 1;
    const items_per_page = process.env.ITEMS_PER_PAGE;

    let users = await User.find({
      '$and': [
        {last_name: { $regex: `^${startsWith}`, $options: 'i' } },
        {$expr: { $gt: [{ $strLenCP: '$quote' }, quoteLength] }},
      ]
    }).skip((page - 1) * items_per_page).limit(items_per_page);

    const totalItems = await User.find({
      '$and': [
        {last_name: { $regex: `^${startsWith}`, $options: 'i' } },
        {$expr: { $gt: [{ $strLenCP: '$quote' }, quoteLength] }},
      ]
    }).countDocuments();

    users = users.filter(user => {
      return user.email.toLowerCase().includes(user.last_name.toLowerCase());
    })

    res.status(200).json({
      users: users,
      metaData: {
        totalItems,
        items_per_page,
        page
      }
    })
  } catch (err) {
    res.status(404).json({
      message: err.message
    });
  }
}

export const car_email_filter = async (req, res) => {
  try{
    const {car} = req.body;
    const page = req.query.page || 1;
    const items_per_page = process.env.ITEMS_PER_PAGE;

    const users = await User.find({
      '$and': [
        {email: { '$not': /1|2|3|4|5|6|7|8|9|0/ }},
        {car: { '$in': car }}
      ]
    }).skip((page - 1) * items_per_page).limit(items_per_page);

    const totalItems = await User.find({
      '$and': [
        {email: { '$not': /1|2|3|4|5|6|7|8|9|0/ }},
        {car: { '$in': car }}
      ]
    }).countDocuments();

    res.status(200).json({
      users,
      metaData: {
        totalItems,
        items_per_page,
        page
      }
    })
  } catch (err) {
    res.status(404).json({
      message: err.message
    });
  }
}

export const cities = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const items_per_page = process.env.ITEMS_PER_PAGE;

    const cities = await User.aggregate([
      {$group : {_id:"$city", count:{$sum:1}, avgSalary: {$avg: "$income"}}}, //groupby with city and count has the number of users from each city
      {$sort: {count:-1}} //sorts descending by count
    ]).skip((page - 1) * items_per_page).limit(10);

    const totalItems = 10;

    res.status(200).json({
      cities,
      metaData: {
        totalItems,
        items_per_page,
        page
      }
    })
  } catch(err) {
    res.status(404).json({
      message: err.message
    });
  }
}
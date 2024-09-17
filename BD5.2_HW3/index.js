let express = require('express');
let { company } = require('./models/company.model');
let { sequelize } = require('./lib/index');

let app = express();

let companies = [
  {
    id: 1,
    name: 'Tech Innovators',
    industry: 'Technology',
    foundedYear: 2010,
    headquarters: 'San Francisco',
    revenue: 75000000,
  },
  {
    id: 2,
    name: 'Green Earth',
    industry: 'Renewable Energy',
    foundedYear: 2015,
    headquarters: 'Portland',
    revenue: 50000000,
  },
  {
    id: 3,
    name: 'Innovatech',
    industry: 'Technology',
    foundedYear: 2012,
    headquarters: 'Los Angeles',
    revenue: 65000000,
  },
  {
    id: 4,
    name: 'Solar Solutions',
    industry: 'Renewable Energy',
    foundedYear: 2015,
    headquarters: 'Austin',
    revenue: 60000000,
  },
  {
    id: 5,
    name: 'HealthFirst',
    industry: 'Healthcare',
    foundedYear: 2008,
    headquarters: 'New York',
    revenue: 80000000,
  },
  {
    id: 6,
    name: 'EcoPower',
    industry: 'Renewable Energy',
    foundedYear: 2018,
    headquarters: 'Seattle',
    revenue: 55000000,
  },
  {
    id: 7,
    name: 'MediCare',
    industry: 'Healthcare',
    foundedYear: 2012,
    headquarters: 'Boston',
    revenue: 70000000,
  },
  {
    id: 8,
    name: 'NextGen Tech',
    industry: 'Technology',
    foundedYear: 2018,
    headquarters: 'Chicago',
    revenue: 72000000,
  },
  {
    id: 9,
    name: 'LifeWell',
    industry: 'Healthcare',
    foundedYear: 2010,
    headquarters: 'Houston',
    revenue: 75000000,
  },
  {
    id: 10,
    name: 'CleanTech',
    industry: 'Renewable Energy',
    foundedYear: 2008,
    headquarters: 'Denver',
    revenue: 62000000,
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await company.bulkCreate(companies);
    res.status(200).json({ message: 'Database Seeding Successful' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error seeding the data', error: error.message });
  }
});

// Exercise 1: Fetch all companies
async function fetchAllCompanies() {
  let companies = await company.findAll();
  return { companies };
}

app.get('/companies', async (req, res) => {
  try {
    let result = await fetchAllCompanies();
    if (result.companies.length === 0) {
      return res.status(404).json({ message: 'No Companies Found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Exercise 2: Fetch companies details by ID
async function fetchCompaniesById(id) {
  let companies = await company.findOne({ where: { id } });
  return { company: companies };
}

app.get('/companies/details/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await fetchCompaniesById(id);
    if (!result.company) {
      return res
        .status(404)
        .json({ message: 'No Companies Found for the ID.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch all companies by industry
async function fetchEmployeesByIndustry(industry) {
  let companies = await company.findAll({ where: { industry } });
  return { companies: companies };
}

app.get('/companies/industry/:industry', async (req, res) => {
  try {
    let industry = req.params.industry;
    let result = await fetchEmployeesByIndustry(industry);
    if (result.companies.length === 0) {
      return res
        .status(404)
        .json({ message: 'No Companies with this Industry found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Sort all the companies by their revenue
async function sortCompaniesByRevenue(order) {
  let companies = await company.findAll({ order: [['revenue', order]] });
  return { companies: companies };
}

app.get('/companies/revenue', async (req, res) => {
  try {
    let order = req.query.order;
    let result = await sortCompaniesByRevenue(order);
    if (result.companies.length === 0) {
      return res.status(404).json({ message: 'No companies with this order.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');
//const YAML = require('yamljs');
const path = require('path');


//Load the Swagger file or YAML
//const swaggerDoc = YAML.load(path.join(__dirname, './swagger.yaml'));

const swaggerSpec = require('./swagger');

//const userRoutes = require('./routes/user.route');
  
const app = express();
const port = 3000; // process.env.PORT || 3000;

var options = {
  explorer: true
};

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec)); //swaggerDocument, options));

/*
app.get('/api/v1/users', (req, res) => {
	const users =[
		{'id': 1, 'name': 'kevin'},
		{'id': 2, 'name': 'dfin'},
	];
	//res.send(users.json());
	res.send('users');
});

app.get('/', (req, res) => {
	res.send("Welcome escrow web Api");
});
*/

app.listen( port, () =>{
	console.log(`app started and listening on ${port}`);
});



//// 98 78 35 74   mazamesso gzem livraison 
/*
An escrow system is designed to facilitate secure transactions between parties by holding funds or assets in a neutral account until certain conditions are met.

I looked at a similar system and borrowed some inspiration from it - https://www.escrow.com/

This is my perspective on how I would go about designing it.

User Registration and Verification: Users (buyers, sellers, and the escrow service) register on the platform with verified information, such as email, phone number, and payment details.

Listing and Selection: Sellers list their products with detailed descriptions, images, and prices. Buyers browse listings and select the products they want to purchase.

Initiation of Escrow: When a buyer decides to make a purchase, they initiate the transaction and choose the escrow payment method.

Fund Escrow Account: The buyer's payment is sent to the escrow service's account but is not immediately released to the seller.

Seller's Acknowledgment: The seller is notified about the buyer's payment and is requested to prepare the goods for shipment.

Buyer's Acceptance: Once the buyer receives the goods and verifies their condition, they notify the escrow service to release the funds to the seller.

Dispute Resolution: If the buyer is dissatisfied with the goods, they can open a dispute within a specified timeframe. Both parties provide evidence to support their claims (such as photos, receipts, or communication records).

Mediation Process: The escrow service acts as a mediator, reviewing the evidence provided by both parties. If necessary, the escrow service can facilitate communication between the buyer and the seller to reach a resolution.

Resolution and Fund Release: The escrow service makes a decision based on the evidence presented and releases the funds to either the seller or the buyer, depending on the outcome.

Feedback and Rating: After the transaction is completed, both parties have the opportunity to provide feedback and ratings for each other.

Platform Fees: The platform deducts its fees from the transaction amount before releasing the funds to the seller.

Security Measures: The escrow system employs encryption to protect sensitive user data. Two-factor authentication enhances account security. Regular security audits are conducted to identify and address vulnerabilities.

Legal Compliance: The escrow system adheres to relevant financial regulations and consumer protection laws.

Continuous Monitoring and Improvement: The escrow system is regularly monitored for performance, security, and user experience. User feedback is collected to identify areas for improvement.

*/
// https://youtu.be/s-QOJ0TS1yg
/*

Mais comme le dit un sage Bassar :”chacun sait pourquoi il vit”. Et surtout, comment il peut éviter de mourir pour si peu.

https://youtu.be/oRI0dR30USc
*/

// https://togonyigba.tg/afrique-tradition-al%c9%94kpli-ou-adzinu-cet-interdit-sexuel-qui-tue/ 
// https://www.bbc.com/pidgin/articles/cnlyj90q089o
// https://www.npmjs.com/package/express-oauth-server		*
// https://www.npmjs.com/package/express-oauth2-jwt-bearer	*
// https://www.npmjs.com/package/express-jwt-authz			*
// https://www.npmjs.com/package/express-bearer-token		*
// https://www.npmjs.com/package/axios-jwt			*
// https://www.npmjs.com/package/passport-firebase-jwt
// https://www.npmjs.com/package/express-basic-auth



// https://www.npmjs.com/package/@tokenizer/token
// https://www.npmjs.com/package/hydra-express

// https://www.npmjs.com/package/@adminjs/express
// https://www.npmjs.com/package/swagger-express-ts
// https://www.npmjs.com/package/swagger-routes-express
// https://www.npmjs.com/package/@node-oauth/express-oauth-server

// https://www.npmjs.com/package/@types/api-error-handler
// https://www.npmjs.com/package/hydra

// https://www.npmjs.com/package/express-sessions
// https://www.npmjs.com/package/express-enrouten


/*
https://www.cfetogo.tg/annonces-legales/details-annonce-15224.html
https://www.odoo.com/fr_FR/partners/country/benin-25: 90 81 82 61 - 96 94 49 49 /  DANAHCA FARMS SARL

*****
https://www.cdcb.bj/Appels-d-offre
https://www.odoo.com/fr_FR/customers
https://www.dnb.com/business-directory/company-information.agriculture_forestry_fishing_and_hunting.tg.html?page=2
https://x.com/ATS_AFRIQ/status/1410613095907528710
DANAHCA FARMS: https://www.odoo.com/fr_FR/customers/country/togo-207/page/2
https://www.cdcb.bj/Appels-d-offre
https://www.emploi.tg/recruteur/198036
https://www.cdcb.bj/files/Avis%20attrib_001_2025%20ATS_001.pdf
https://www.cdcb.bj/Appels-d-offre
https://www.dnb.com/business-directory/company-information.other_crop_farming.tg.maritime_(region)
*/
/*
https://calendly.com/aholia-monney-unimhac/30min?month=2025-10
https://www.odoo.com/fr_FR/partners/unimhac-software-togo-23262726?country_id=207
*/

/*
https://psjobs-emploisfp.psc-cfp.gc.ca/psrs-srfp/applicant/page1800?poster=2094842
*/
/*
https://psjobs-emploisfp.psc-cfp.gc.ca/psrs-srfp/applicant/page2440?fromMenu=true
*/
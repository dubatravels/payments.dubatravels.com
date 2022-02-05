/* eslint-disable react/style-prop-object */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import Chance from "chance";

const chanceObj = new Chance();

const accounts = [
  {
    id: chanceObj.guid(),
    name: "Duba Travel and Tourism",
    logo: "/adib.svg",
    bankName: "Abu Dhabi Islamic Bank",
    accountNumber: "19017480",
    swiftCode: "ADIBAEAD",
    ibanNumber: "AE390500000000019017480",
    country: "United Arab Emirates",
    currency: "AED",
    branch: "Abu Dhabi",
  },
  {
    id: chanceObj.guid(),
    name: "Duba Travel and Tourism",
    logo: "/federalbank.svg",
    bankName: "Federal Bank",
    accountNumber: "14270200036435",
    swiftCode: "FDRLINBB",
    ifsc: "FDRL0001427",
    country: "India",
    currency: "INR",
    branch: "Kottakkal",
  },
  {
    id: chanceObj.guid(),
    name: "Mohammed Farish",
    logo: "/nbd.svg",
    bankName: "Emirates NBD Bank",
    accountNumber: "1015786061301",
    swiftCode: "EBILAEAD",
    ibanNumber: "AE730260001015786061301",
    country: "United Arab Emirates",
    currency: "AED",
    branch: "Abu Dhabi",
    hidden: true,
  },
  {
    id: chanceObj.guid(),
    name: "Mohammed Farish",
    logo: "/adcb.svg",
    bankName: "Abu Dhabi Commercial Bank",
    accountNumber: "11990831920001",
    swiftCode: "ADCBAEAA",
    ibanNumber: "AE390030011990831920001",
    country: "United Arab Emirates",
    currency: "AED",
    branch: "Abu Dhabi",
    hidden: true,
  },
];

export default accounts;

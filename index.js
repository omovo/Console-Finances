
var finances = [
    ['Jan-2010', 867884],
    ['Feb-2010', 984655],
    ['Mar-2010', 322013],
    ['Apr-2010', -69417],
    ['May-2010', 310503],
    ['Jun-2010', 522857],
    ['Jul-2010', 1033096],
    ['Aug-2010', 604885],
    ['Sep-2010', -216386],
    ['Oct-2010', 477532],
    ['Nov-2010', 893810],
    ['Dec-2010', -80353],
    ['Jan-2011', 779806],
    ['Feb-2011', -335203],
    ['Mar-2011', 697845],
    ['Apr-2011', 793163],
    ['May-2011', 485070],
    ['Jun-2011', 584122],
    ['Jul-2011', 62729],
    ['Aug-2011', 668179],
    ['Sep-2011', 899906],
    ['Oct-2011', 834719],
    ['Nov-2011', 132003],
    ['Dec-2011', 309978],
    ['Jan-2012', -755566],
    ['Feb-2012', 1170593],
    ['Mar-2012', 252788],
    ['Apr-2012', 1151518],
    ['May-2012', 817256],
    ['Jun-2012', 570757],
    ['Jul-2012', 506702],
    ['Aug-2012', -1022534],
    ['Sep-2012', 475062],
    ['Oct-2012', 779976],
    ['Nov-2012', 144175],
    ['Dec-2012', 542494],
    ['Jan-2013', 359333],
    ['Feb-2013', 321469],
    ['Mar-2013', 67780],
    ['Apr-2013', 471435],
    ['May-2013', 565603],
    ['Jun-2013', 872480],
    ['Jul-2013', 789480],
    ['Aug-2013', 999942],
    ['Sep-2013', -1196225],
    ['Oct-2013', 268997],
    ['Nov-2013', -687986],
    ['Dec-2013', 1150461],
    ['Jan-2014', 682458],
    ['Feb-2014', 617856],
    ['Mar-2014', 824098],
    ['Apr-2014', 581943],
    ['May-2014', 132864],
    ['Jun-2014', 448062],
    ['Jul-2014', 689161],
    ['Aug-2014', 800701],
    ['Sep-2014', 1166643],
    ['Oct-2014', 947333],
    ['Nov-2014', 578668],
    ['Dec-2014', 988505],
    ['Jan-2015', 1139715],
    ['Feb-2015', 1029471],
    ['Mar-2015', 687533],
    ['Apr-2015', -524626],
    ['May-2015', 158620],
    ['Jun-2015', 87795],
    ['Jul-2015', 423389],
    ['Aug-2015', 840723],
    ['Sep-2015', 568529],
    ['Oct-2015', 332067],
    ['Nov-2015', 989499],
    ['Dec-2015', 778237],
    ['Jan-2016', 650000],
    ['Feb-2016', -1100387],
    ['Mar-2016', -174946],
    ['Apr-2016', 757143],
    ['May-2016', 445709],
    ['Jun-2016', 712961],
    ['Jul-2016', -1163797],
    ['Aug-2016', 569899],
    ['Sep-2016', 768450],
    ['Oct-2016', 102685],
    ['Nov-2016', 795914],
    ['Dec-2016', 60988],
    ['Jan-2017', 138230],
    ['Feb-2017', 671099]
    ];

//
// Dataset initialization.
///
const dataset = (typeof finances !== 'undefined') ? finances : [];

///
// Functions declarations. 
///

/**
 * Gets a transaction from the dataset.
 * 
 * @param {int} index
 *      Index of the transaction.
 * @returns {Array} 
 *      A transaction array from the dataset with month in format M-Y,
 *      and balance as signed integer.
 */
function getTransaction(index) {
    return dataset[index]
}

/**
 * Gets the date from a given transaction of the dataset.
 * 
 * @param {Array} transaction 
 *      A transaction array from the dataset with month in format M-Y,
 *      and balance as signed Number.
 * @returns {String}
 *      Date in String formatting 'M-Y'.
 */
function getTransactionDate(transaction) {
    return transaction[0];
}

/**
 * Gets the balance from a given transaction of the dataset.
 * 
 * @param {Array} transaction 
 *      A transaction array from the dataset with date in format M-Y,
 *      and balance as signed Number.
 * @returns {Number}
 *      A signed Number representing the balance of the transaction.
 */
function getTransactionBalance(transaction) {
    return transaction[1];
}

/**
 * Prints a transaction.
 * 
 * @param {Array} transaction 
 *      A transaction array from the dataset with month in format M-Y,
 *      and balance as signed Number.
 */
function printTransaction(transaction) {
    console.log("Date: ", getTransactionDate(transaction), " Profit/Loss: ", getTransactionBalance(transaction));
}

/**
 * Gets total months from the dataset.
 * 
 * @returns {Array}
 *      An array of different dates with format 'M-Y'.
 */
function getTotalMonths() {
    let months = [];

    for (let index = 0; index < dataset.length; index++) {
        const transaction = getTransaction(index);
        const date = getTransactionDate(transaction);

        if (!months.includes(date)) {
            months.push(date);
        } 
    }

    return months.length;
}

/**
 * Gets the net total net amount of Profit/Losses over the entire period in the dataset.
 * 
 * @returns {Number}
 *      A signed Number representing the total net balance from the dataset.
 */
function getTotalAmount() {
    let totalAmount = .0;

    for (let index = 0; index < dataset.length; index++) {
        const transaction = getTransaction(index);
        const balance = getTransactionBalance(transaction);

        totalAmount += balance;
    }

    return totalAmount;
}

/**
 * Gets all rate of changes between two consecutive periods over the dataset.
 * 
 * @returns {Array}
 *      All the rates of change over all the periods of the dataset. 
 */
function getRateOfChanges() {
    let rateOfChanges = [];

    for (let index = 1; index < dataset.length; index++) {
        const [presentDate, presentAmount] = getTransaction(index);
        const [previousDate, previoustAmount] = getTransaction(index - 1);
        
        const rateOfChangeAmount = presentAmount - previoustAmount;

        rateOfChanges.push(rateOfChangeAmount);
    }

    return rateOfChanges;
}

/**
 * Gets the average change in Profit/Losses over the entire period of the dataset.
 * 
 * @returns {Number}
 *      A signed number representing the average rate of change amount.
 */
function getAverageChange() {

    const rateOfChanges = getRateOfChanges();

    const totalRoCAmount = rateOfChanges.reduce(function(total, rocAmount) {
        return total + rocAmount;
    }, .0);

    const totalMonths = getTotalMonths() - 1; // Removes the first month that does not have a previous period.

    const averageChange = totalRoCAmount / totalMonths;

    return averageChange;
}

/**
 * Gets the greatest increase in profits (date and amount) over the entire period.
 * 
 * @returns {Array}
 *      The transaction (date and amount) with the greatest amount.
 */
function getGreatestIncrease() {
    const rateOfChanges = getRateOfChanges();
    const maxRoCAmount = Math.max(...rateOfChanges);

    const index = rateOfChanges.indexOf(maxRoCAmount) + 1; // Add 1 to get the present transaction of the period.
    const [presentDatePeriod, presentBalancePeriod] = getTransaction(index);
    
    return [presentDatePeriod, maxRoCAmount];
}

/**
 * Gets the greatest decrease in losses (date and amount) over the entire period.
 * 
 * @returns {Array}
 *      The transaction (date and amount) with the smallest amount.
 */
function getGreatestDecrease() {
    const rateOfChanges = getRateOfChanges();
    const minRoCAmount = Math.min(...rateOfChanges);

    const index = rateOfChanges.indexOf(minRoCAmount) + 1; // Add 1 to get the present transaction of the period.
    const [presentDatePeriod, presentBalancePeriod] = getTransaction(index);
    
    return [presentDatePeriod, minRoCAmount];
}

/**
 * Main entry point.
 * 
 * @returns {String}
 *      The Financial Analysis output.
 */
function financialAnalysis() {
    const totalMonths = getTotalMonths();
    const total = getTotalAmount();
    const averageChange = getAverageChange();
    const [giDate, giAmount] = getGreatestIncrease();
    const [gdDate, gdAmount] = getGreatestDecrease();

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const output = `
    Financial Analysis
------------------------------------------------------------------------
    Total Months: ${totalMonths}
    Total: ${formatter.format(total)}
    Average Change: ${formatter.format(averageChange)}
    Greatest Increase in Profits: ${giDate} (${formatter.format(giAmount)})
    Greatest Decrease in Profits: ${gdDate} (${formatter.format(gdAmount)})
------------------------------------------------------------------------
    `;

    return output;
}

///
// Executes main entry point. 
///

// Gets financial analysis output.
const output = financialAnalysis();

// Logs output to the console.
console.log(output);
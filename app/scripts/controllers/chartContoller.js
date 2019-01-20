'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ChartCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
		
$scope.quote = {
	asset_id: "mmtest7",
	type: 'quote',
	name: 'ARG Auto Repair Group Ltd'
}

$scope.newQuote = true;
$scope.submitForm = function(){

	const API_PATH = 'https://test.bigchaindb.com/api/v1/'

	// Create a new keypair.
	const alice = new BigchainDB.Ed25519Keypair()
$scope.quote.datetime = new Date();
	// Construct a transaction payload
	const tx = BigchainDB.Transaction.makeCreateTransaction(
			// Define the asset to store, in this example it is the current temperature
			// (in Celsius) for the city of Berlin.
			$scope.quote,

			// Metadata contains information about the transaction itself
			// (can be `null` if not needed)
			{ what: 'My first BigchainDB transaction' },

			// A transaction needs an output
			[ BigchainDB.Transaction.makeOutput(
							BigchainDB.Transaction.makeEd25519Condition(alice.publicKey))
			],
			alice.publicKey
	)

	// Sign the transaction with private keys
	const txSigned = BigchainDB.Transaction.signTransaction(tx, alice.privateKey)

	// Send the transaction off to BigchainDB
	let conn = new BigchainDB.Connection(API_PATH)

	conn.postTransactionCommit(txSigned)
			.then(res => {
					console.log('Transaction', txSigned.id, 'accepted')
			})
	// Check console for the transaction's status
	$scope.newQuote = false;
}
}]);
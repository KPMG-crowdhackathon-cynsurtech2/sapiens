'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:TableCtrl
 * @description
 * # TableCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('TableCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
      $('#receiptFile').on('change', function(){
          $scope.$apply(function(){
              $scope.fileSelected = true;
          })
      })
      
$scope.receipt = {
    asset_id: "mmtest7",
	type: 'receipt',
    name: 'ARG Auto Repair Group Ltd',
    image: '/img/Auto-repair-receipt.png'
}

$scope.payment = {
	asset_id: "mmtest7",
	type: 'payment',
	iban: 'CY17 0020 0128 0000 0012 0052 7600'
}
$scope.newReceipt = true;

var submitPayment = function(){

	$scope.payment.amount = $scope.receipt.amount;
	const API_PATH = 'https://test.bigchaindb.com/api/v1/'

	// Create a new keypair.
	const alice = new BigchainDB.Ed25519Keypair()
$scope.payment.datetime = new Date();
	// Construct a transaction payload
	const tx = BigchainDB.Transaction.makeCreateTransaction(
			// Define the asset to store, in this example it is the current temperature
			// (in Celsius) for the city of Berlin.
			$scope.payment,

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
}

    $scope.submitForm = function(){

			const API_PATH = 'https://test.bigchaindb.com/api/v1/'

			// Create a new keypair.
			const alice = new BigchainDB.Ed25519Keypair()
$scope.receipt.datetime = new Date();
			// Construct a transaction payload
			const tx = BigchainDB.Transaction.makeCreateTransaction(
					// Define the asset to store, in this example it is the current temperature
					// (in Celsius) for the city of Berlin.
					$scope.receipt,

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
							console.log('Transaction', txSigned.id, 'accepted');
                            submitPayment();
					})
			// Check console for the transaction's status
			$scope.newReceipt = false;
	}
}]);
'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:addClaimCtrl
 * @description
 * # addClaimCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('addClaimCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
      $scope.claim = {
        asset_id: "mmtest2",

      };
      $scope.newClaim = true;
    $scope.submitForm = function(){

        const API_PATH = 'https://test.bigchaindb.com/api/v1/'

        // Create a new keypair.
        const alice = new BigchainDB.Ed25519Keypair()
$scope.claim.datetime = new Date();
        // Construct a transaction payload
        const tx = BigchainDB.Transaction.makeCreateTransaction(
            // Define the asset to store, in this example it is the current temperature
            // (in Celsius) for the city of Berlin.
            $scope.claim,

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
        $scope.newClaim = false;
    }

    function readURL(input) {

        if (input.files && input.files[0]) {
          var reader = new FileReader();
      
          reader.onload = function(e) {
            $('#blah').attr('src', e.target.result);
          }
      
          reader.readAsDataURL(input.files[0]);
        }
      }
      
      $('#myImage').on('change', function() {
        readURL(this);
      })
      
      $scope.reset = function(){
        $('#blah').attr('src', '');
      }

      $scope.showImage = function(){
          $scope.shouldShowImage = true;
      }
}]);
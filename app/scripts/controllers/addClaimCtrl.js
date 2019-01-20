'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:addClaimCtrl
 * @description
 * # addClaimCtrl
 * Controller of the sbAdminApp
 */
var images = [
  "https://www.bournemouthecho.co.uk/resources/images/5090251/?type=responsive-gallery-fullscreen",
  "https://ichef.bbci.co.uk/news/660/cpsprodpb/1AD9/production/_100837860_teslacrash.jpg",
  "https://2qibqm39xjt6q46gf1rwo2g1-wpengine.netdna-ssl.com/wp-content/uploads/2017/11/9241976_web1_M-crash.jpg",
  "https://www.salisburyjournal.co.uk/resources/images/6125195/?type=responsive-gallery-fullscreen",
  "https://www.straitstimes.com/sites/default/files/styles/article_pictrure_780x520_/public/articles/2018/06/17/yq-jbcarinci1-17062018.jpg?itok=QR-mR1GU&timestamp=1529227152",
  "https://e3.365dm.com/18/07/1096x616/skynews-scotland-moray-keith_4372909.jpg?20180727110824",
  "https://cni.pmgnews.com/images/artimg/00003599918649.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6sIjA020fes4Gv0g-dXQSvHY5yG0-_eDorubqR7CchFwcQXZN",
  "https://bs2u.files.wordpress.com/2012/03/march-3.jpg",
  "https://bs2u.files.wordpress.com/2012/03/march-3.jpg",
  "https://bs2u.files.wordpress.com/2012/03/march-3.jpg"
];
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
angular.module('sbAdminApp')
  .controller('addClaimCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
      $scope.claim = {
        asset_id: "mmtest7",
        type: "claim",
        qr: 'https://internationalbarcodes.net/wp-content/uploads/2017/04/QR%20code%20example.jpg',
        map: '<iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d16951.582773438662!2d33.36426954682427!3d35.160802420774274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1scar+repair!5e0!3m2!1sen!2s!4v1547968306231" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'
      };
      $scope.newClaim = true;

      $scope.radar = {
        labels:["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
  
        data:[
            [65, 59, 90, 81, 56, 55, 40],
            [28, 48, 40, 19, 96, 27, 100]
        ]
      };
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
      
      $scope.reset = function(){
        $('#blah').attr('src', '');
      }

      $scope.showImage = function(){
          $scope.shouldShowImage = true;
          // $scope.claim.image = images[getRandomInt(0,10)];
          $scope.claim.image = images[9];
      }
}]);
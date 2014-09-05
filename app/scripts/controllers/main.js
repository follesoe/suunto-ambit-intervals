'use strict';

/**
 * @ngdoc function
 * @name ambitIntervalsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ambitIntervalsApp
 */
angular.module('ambitIntervalsApp')
  .controller('MainCtrl', function ($scope) {

    var data = {
      'steps': [
        {
          'type': 'WarmUp',
          'duration': {
            'type': 'Lap'
          },
          'target': {
            'type': 'None'
          }
        },
        {
          'type': 'Repeat',
          'times': 2,
          'steps': [
            {
              'type': 'Interval',
              'duration': {
                'type': 'Distance',
                'value': 1.2
              },
              'target': {
                'type': 'Pace',
                'from': '04:10',
                'to': '04:15'
              }
            },
            {
              'type': 'Recovery',
              'duration': {
                'type': 'Distance',
                'value': 0.6
              },
              'target': {
                'type': 'None'
              }
            },
            {
              'type': 'Interval',
              'duration': {
                'type': 'Distance',
                'value': 0.8
              },
              'target': {
                'type': 'Pace',
                'from': '03:45',
                'to': '03:50'
              }
            },
            {
              'type': 'Recovery',
              'duration': {
                'type': 'Distance',
                'value': 0.4
              },
              'target': {
                'type': 'None'
              }
            },
            {
              'type': 'Interval',
              'duration': {
                'type': 'Distance',
                'value': 0.4
              },
              'target': {
                'type': 'Pace',
                'from': '03:50',
                'to': '03:55'
              }
            },
            {
              'type': 'Recovery',
              'duration': {
                'type': 'Distance',
                'value': 0.2
              },
              'target': {
                'type': 'None'
              }
            }
          ]
        },
        {
          'type': 'CoolDown',
          'duration': {
            'type': 'Lap'
          },
          'target': {
            'type': 'None'
          }
        }
      ]
    };

    $scope.interval = {
      name: 'New Interval Set',
      description: '',
      steps: data.steps
    };

    $scope.addStep = function () {
      var newStep = {
        type: 'Other',
        duration: { type: 'Lap' },
        target: { type: 'None' }
      };

      $scope.interval.steps.push(newStep);
    };

    $scope.addRepeat = function () {
      var newRepeat = {
        type: 'Repeat',
        times: 1,
        steps: []
      };
      $scope.interval.steps.push(newRepeat);
    };

    $scope.options = {
      accept: function(sourceNode, destNode) {
        var data = sourceNode.$modelValue;
        var destType = destNode.$element.attr('data-nodetype');

        if (destType === 'Repeat' && data.type === 'Repeat') {
          return false;
        } else {
          return true;
        }
      }
    };
  });

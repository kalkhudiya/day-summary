/*
Get Day Summery
Author: Kalkhudiya
*/
'use strict';
angular.module('daySummery', [])

.controller('homeCtrl', ['$scope', 'getTheSummery', function($scope, getTheSummery) {
    $scope.day = {
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false
    };

    $scope.getDaySummery = function() {
        $scope.summery = getTheSummery.getDaySummery($scope.day);
    };
}])

.factory('getTheSummery', function() {
    var findSummery = {
        getDaySummery: function(dayJson) {
            var selLength    = 0,
                index        = 0,
                selectedDays = [],
                weekDays     = [],
                weekEnd      = [],
                html         = '',
                prevKey      = '',
                isContinue   = false;
            //Adding temp item to increase loop 1 time
            dayJson['temp'] = false;
            angular.forEach(dayJson, function(val, key) {
                if (val === true) {
                    if (!isContinue) {
                        if (selLength != 0) {
                            html += ', ';
                        }
                        html += key;
                    } else {
                        prevKey = key;
                    }
                    isContinue = true;
                    selectedDays.push(key);
                    selLength++;
                } else if (isContinue) {
                    if (prevKey != '') {
                        html += ' - ' + prevKey;
                        prevKey = '';
                    }
                    isContinue = false;
                }
                //Getting key for week days
                //Assuming the dayJson is in valid week day sequence
                //Pushing first five to week day
                //And last 2 for weekend
                index++;
                if (index > 0 && index <= 5 ) {
                    weekDays.push(key);
                } else if (index > 5 && index <= 7){
                    weekEnd.push(key);
                }
            });
            if (selLength != 0) {
                if (selLength == 7) {
                    html = 'All days';
                } else if (selLength === 5 && this.findValInArray(weekDays, selectedDays)) {
                    html = 'Weekdays';
                } else if (selLength === 2 && this.findValInArray(weekEnd, selectedDays)) {
                    html = 'Weekend';
                }
            }
            return html;
        },
        findValInArray: function(needles, haystack) {
            var isExist = true;
            angular.forEach(needles, function(val, key) {
                if (haystack.indexOf(val) < 0) {
                    isExist = false;
                }
            });
            return isExist;
        }
    };
    return findSummery;
});
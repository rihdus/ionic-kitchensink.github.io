/**
 * Created by rihdus on 13/12/15.
 */

;
(function () {
	"use strict";

	angular.module('rihdus.ionAlphaScroll', ['ionic'])
		.directive('ionAlphaScrollBar', [
			'$ionicScrollDelegate', '$ionicPosition',
			function ($ionicScrollDelegate, $ionicPosition) {
				return {
					template: '<ion-scroll scrollbar-y="false" has-bouncing="false" class="alpha-scrollBar" on-touch="onTouch($event)"></ion-scroll>',
					restrict: 'A',
					scope: {
						scrollIndex: "="
					},
					compile: function ($elem, $attr) {

						var scrollDelegate = null
							, scrollIndex = []
							, scrollTargetElements = []
							, scrollIndexPosition = null
							;

						var ionContentEl = $elem.parent().parent();
						var scrollEl = $elem.children();
						for (var i = 65; i < 91; i++) {
							var char = String.fromCharCode(i);
						}

						return {
							pre: preLink,
							post: postLink
						};

						function preLink() {
						}

						function postLink($scope, $elem, $attr, ctrls) {

							scrollDelegate = $ionicScrollDelegate.$getByHandle($attr.ionAlphaScrollBar);

							//console.log(scrollDelegate);
							//console.log($scope.scrollIndex);

							$scope.onTouch = onTouch;
							$scope.onDrag = onDrag;

							ionContentEl.append($elem);
							ionContentEl.addClass('alpha-scroll-container');

							buildScrollBar($scope.scrollIndex);

							function computeScrollIndexPositions(scrollIndices) {
								var positions = [];
								angular.forEach(scrollIndices, function (index) {
									var elId = index.id;
									var el = angular.element(document.getElementById(elId));
									var pos = $ionicPosition.position(el);
									if (el) {
										positions.push({
											id: elId,
											position: $ionicPosition.position(el)
										});
									}
								});
								return positions;
							}

							function onTouch(e) {
								//console.log(e.srcElement);
								scrollIndexPosition = scrollIndexPosition || computeScrollIndexPositions($scope.scrollIndex);
								var elem = e.target;
								var position = getElemPosition(elem);
								if(position) {
									scrollContentTo(position.position);
								}
								console.log(elem.textContent, position.position.top);
							}

							function onDrag(e) {
								e.stopPropagation();
								e.preventDefault();
								var elem = e.target;
								var position = getElemPosition(elem);

								if(position) {
									scrollContentTo(position.position);
								}
								console.log(e.srcElement, e.target);
							}

							function buildScrollBar(indices) {
								var scrollContainer = scrollEl.children();
								var i = 0;
								angular.forEach(indices, function (index) {
									var el = angular.element('<div class="alpha-scroll-bar-letter">');
									//el.data('target', index.id);
									el.attr('target', index.id);
									el.append(index.char);
									if (i % 2 == 0) {
										el.addClass('hide-on-keyboard-open');
									}
									scrollContainer.append(el);
									i++
								});
							}

							function scrollContentTo(position) {
								scrollDelegate.scrollTo(0, position.top);
							}

							function getElemPosition(el) {
								var target = el.attributes[1];
								var targetIndex = target.value;
								var position = _.find(scrollIndexPosition, function(item) {
									return item.id == targetIndex;
								});
								return position;
							}
						}
					}
				}
			}
		])

})();
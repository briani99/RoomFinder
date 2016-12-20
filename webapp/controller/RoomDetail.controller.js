sap.ui.define([
	"briani99/ui5/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("briani99.ui5.controller.RoomDetail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf briani99.ui5.view.RoomDetail
		 */
		onInit: function() {
			this.getRouter().getRoute("roomDetails").attachPatternMatched(this._onRoomDetailsMatched, this);
			this.getRouter().getRoute("fingerDetails").attachPatternMatched(this._onFloorDetailsMatched, this);
		},

		_onRoomDetailsMatched: function (oEvent) {
			var sObjectPath =  oEvent.getParameter("arguments").id;
			
			this.getView().bindElement({
					path: "/roomdata/" + sObjectPath
				});
		},
		
		_onFloorDetailsMatched: function (oEvent) {
			
			var sFloor =  oEvent.getParameter("arguments").floor;
			var sFinger =  oEvent.getParameter("arguments").finger;
			
			//sPath = "/zonedata/0/nodes/0" reassemble something like this
			var sPath = "/zonedata/" + sFloor + "/nodes/" + sFinger;
			
			this.getView().bindElement({
					path: sPath
			});
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf briani99.ui5.view.RoomDetail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf briani99.ui5.view.RoomDetail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf briani99.ui5.view.RoomDetail
		 */
		//	onExit: function() {
		//
		//	}

	});

});
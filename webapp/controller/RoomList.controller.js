sap.ui.define([
	"briani99/ui5/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("briani99.ui5.controller.RoomList", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf briani99.ui5.view.RoomList
		 */
		//	onInit: function() {
		//
		//	},
		onInit: function () {
			
			
			this.getRouter().getRoute("rooms").attachPatternMatched(this._onObjectMatched, this);
			
		},
		_onObjectMatched: function (oEvent) {
			
			var listSorter = new sap.ui.model.Sorter("name", false); // sort descending
			var listItemTemplate = new sap.m.StandardListItem({
										title : "{name}",   
										icon:"{pic}",
		                                type : sap.m.ListType.Navigation,   
		                                description:"{building}",  
		                                press :  [this.onNavigateToDetail, this]
			});
			
			var list = this.getView().byId("lRooms");
			list.bindAggregation("items", "/roomdata", listItemTemplate, listSorter);
		},
		
		onNavigateToDetail: function (oEvent) {
			
			var oItem = oEvent.getSource();
			var oCtx =  oItem.getBindingContext();
			var sPath = oCtx.getPath();
			
			var roomid = sPath.substring(10);
			
			this.getRouter().navTo("roomDetails", {id:roomid});
			
		},
		
		
		
		onFilterList: function(oEvent){
			var like = oEvent.getParameter("newValue");
			var oFilter = new sap.ui.model.Filter("name", 
												sap.ui.model.FilterOperator.StartsWith, 
												like);
			
			var list = this.getView().byId("lRooms");
			var listBinding = list .getBinding("items");
			listBinding.filter([oFilter]);
	}
		
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf briani99.ui5.view.RoomList
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf briani99.ui5.view.RoomList
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf briani99.ui5.view.RoomList
		 */
		//	onExit: function() {
		//
		//	}

	});

});
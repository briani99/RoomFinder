sap.ui.define([
	"briani99/ui5/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("briani99.ui5.controller.Floor", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf briani99.ui5.view.Floor
		 */
		onInit: function() {
			this.getRouter().getRoute("floor").attachPatternMatched(this._onfloorMatched, this);
			this.getRouter().getRoute("floorDetails").attachPatternMatched(this._onfloorDetailsMatched, this);
		},

		_onfloorMatched: function (oEvent) {
				
			var areaItemTemplate = new sap.m.StandardListItem({
				title : "{name}",  
				icon : "{pic}",
	            type : sap.m.ListType.Navigation,   
	            press : [this.onRowSelected, this]
			});
			var newList = this.getView().byId("floorList");
			
			newList.bindItems({
			  path: "/zonedata", 
			  template: areaItemTemplate
			});
		},
		
		_onfloorDetailsMatched: function (oEvent) {
				
			var areaItemTemplate = new sap.m.StandardListItem({
				title : "{name}",  
				icon : "{pic}",
	            type : sap.m.ListType.Navigation,   
	            press : [this.onRowSelected, this]
			});
		
			var newList = this.getView().byId("floorList");
			
			var sLevel =  oEvent.getParameter("arguments").floor;
			
			newList.bindItems({
			  path: "/zonedata/" + sLevel + "/nodes", 
			  template: areaItemTemplate
			});
		},
			
		onRowSelected: function(oEvent){
			var oCtx =  oEvent.getSource().getBindingContext();
			var sPath = oCtx.getPath();
			var obj = oCtx.getObject();
			
			if (obj.leaf === "true") { 
				
				//sPath = "/zonedata/0/nodes/0" so lets chop it up
				var sFinger = sPath.substring(sPath.lastIndexOf("/") + 1);
				var newPath = sPath.substring(0, sPath.lastIndexOf("/"));
				newPath = newPath.substring(0, newPath.lastIndexOf("/"));
				var sFloor = newPath.substring(newPath.lastIndexOf("/") + 1);
				
				//no children so lets display the map
				this.getRouter().navTo("fingerDetails", {floor: sFloor, finger: sFinger});
			 }
			else
			{
				var sLevel = sPath.substring(sPath.lastIndexOf("/") + 1);
				//no children so lets display the map
				this.getRouter().navTo("floorDetails", {floor: sLevel});
			}
		},

	
		onMoveContextBack: function(){
			
			var newList = this.getView().byId("floorList");
			var path = newList.getBindingInfo('items').path;
			//If the path is back at the start then we need are at the start of the
			//model so the back button should go back to the screen before.
			if(path === '/zonedata'){
				this.onNavBack();
			}
			else
			{
				var areaItemTemplate = new sap.m.StandardListItem({
					title : "{name}",  
					icon : "{pic}",
	            	type : sap.m.ListType.Navigation,   
	            	press : [this.onRowSelected, this]
				});
				//otherwise just go back through the context
				path = path.replace(/\/nodes$/, '');
				var idx = path.lastIndexOf('/');
				if (idx > 0) {
					var previouspath = path.substring(0, idx);
					newList.bindItems({path: previouspath, template: areaItemTemplate});
				}
			}
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf briani99.ui5.view.Floor
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf briani99.ui5.view.Floor
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf briani99.ui5.view.Floor
		 */
		//	onExit: function() {
		//
		//	}

	});

});
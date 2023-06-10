import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { sequelize } from "../database";
import { adminJsResources } from "./resource";
import { locale } from "./locale";
import { dashboardOptions } from "./dashboard";
import { brandingOptins } from "./branding";
import { authOptions } from "./authentication";

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin",
	resources: adminJsResources,
  branding: brandingOptins,
	locale: locale,
	dashboard: dashboardOptions
})

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
	adminJs, 
	authOptions, 
	null,
	{
	resave: false,
	saveUninitialized: false
	}
);
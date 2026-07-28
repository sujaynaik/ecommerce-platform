// side-effect imports, e.g. import '../styles/tokens.css'
declare module "*.css";

// CSS Modules, e.g. import styles from "./Button.module.css"
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
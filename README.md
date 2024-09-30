# Comptroller APP 

## Deploy
Since the backend API is in ASP.net, and deployed on Azure. I will deploy the frontend on the same Azure Resource Group.
1. Create App Service on Azure: `az webapp create --name comptroller --resource-group ComptrollerApiResourceGroup --plan ComptrollerApiServicePlan --runtime "NODE:20-lts" --deployment-local-git`
2. (Option 1) Deploy using Zip file 
2.1 Build and zip
```
npm run build
cd dist 
zip -r ../dist.zip .
cd ..
```
2.2 Deploy  
`az webapp deploy --resource-group ComptrollerApiResourceGroup --name comptroller --src-path ./dist.zip --type zip`
3. (Option 2) Deploy using git 
```
git remote add azure https://comptroller.scm.azurewebsites.net:443/comptroller.git
git add .
git commit -m "your comment"
git push azure main:master (you will need to put username and password from Azure App Service Delpoyment Center)
```

## Testing 
* Live Log Stream 
 `az webapp log tail --resource-group comptrollerapiresourcegroup --name comptroller` 

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

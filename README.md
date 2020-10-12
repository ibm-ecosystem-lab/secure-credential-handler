<p align="center">
    <a href="http://kitura.io/">
        <img src="https://landscape.cncf.io/logos/ibm-member.svg" height="100" alt="IBM Cloud">
    </a>
</p>

<p align="center">
    <a href="https://cloud.ibm.com">
    <img src="https://img.shields.io/badge/IBM%20Cloud-powered-blue.svg" alt="IBM Cloud">
    </a>
    <img src="https://img.shields.io/badge/platform-node-lightgrey.svg?style=flat" alt="platform">
    <img src="https://img.shields.io/badge/license-Apache2-blue.svg?style=flat" alt="Apache 2">
</p>

# Reference Application - Integrating with IBM Cloud Secret Manager Service

This Reference application is build on React Framework, uses the IBM Secret Manager Service to secure the application dependent secrets. In this sample application, you will configure the application secrets as part of the IBM Secret Manager that is deployed as the IBM Cloud Service. As you configure the secrets, you will generate the Secret ID for the secret that to be used by the application. 

Similarly in the application, the parameter of the secret configuration to be configured as part of the 'deployment.yaml' configuration such as the name, and the secret properties such as the username and password in this scenario which shall be used by the application.  There shall be no secret related information is persisted inside the application. 

This ensures the secret information are protected and secured by the IBM Secret Manager, but will be available to the application for its process.

## How is Secret Information made avaiable to the application.

Once the Application is made available in the git repo, IBM Cloud Native toolkit cli shall be made used to deploy the application on the Openshift Platform.
The IBM Cloud Native toolkit cli toolkit can installed to your local environment as below

```$bash
npm install -g @ibmgaragecloud/cloud-native-toolkit-cli
```

Once the Toolkit CLI is installed, Use the IBM Garage for Cloud CLI to register the GIT Repo with Tekton or Jenkins.

```$bash
oc sync <project> --dev
oc pipeline
```

As you deploy the application using the tekton pipeline, one of the task is to pull the Application secrets from the IBM Secret Manager service. This tasks connects securely to the IBM Secret manager using the IBM Token using the IBM Cloud API Key, then pulls the relevant secured data from the Secret Managar using the Secret ID that the application uses. This information is then made available to the application environment as "secrets" configuration which the application can access for its secured channel access


## License

This sample application is licensed under the Apache License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1](https://developercertificate.org/) and the [Apache License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache License FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)




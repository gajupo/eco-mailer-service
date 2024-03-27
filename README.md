# ECO MAILER SERVICE

Eco Mailer Service is a REST API for sending emails of purchasing and attending online courses, using HTML templates. Built with Express.js, TypeScript and inversify for DI, it provides a scalable and easy way to send emails by calling the API and passing the template name.


# Technologies

-   **Node.js & Express.js**: Core technologies for the server and API.
-  **Inversity**: For managing dependencies.
-   **Nodemailer**: Manages the sending of email.
-   **Docker**: Simplifies deployment and environment management.

## Installation

### Prerequisites

-   Docker and Docker Compose for container deployment.
-   Node.js and TypeScript if running locally without Docker.

### Docker Deployment
1 - **Build and Run with Docker Compose**
-   Ensure Docker and Docker Compose are installed.
-   Clone the repository and navigate into it:
```bash
    git clone https://github.com/gajupo/eco-mailer-service.git
    cd eco-mailer-service
```
- Run the following command to build and start the container:
```bash
docker-compose up --build
```
- The API will be accessible at `http://localhost:8086`.

2 - **How to use the endpoints**
***Routes***
You can add more routes to the controller: ``` src/controllers/email.controller.ts ```
- ***POST /sendemail/new-purchase-notification***
	- Description: The intention of this endpoint is to send an email to vendors with the customer and product information.
	- Payload
		```js
		{
			to:  string;
			subject:  string;
			text:  string;
			templateName:  string;
			data:  object;
		}
		```
		- HTML Template name ``new_purchase_notification`` file location ``src/templates/new_purchase_notification.html``
		- The **data** object will be used to compile the html template using lodash function ``_.template()``
- ***POST /sendemail/user-purchase-notification***
	- Description: The intention of this endpoint is to send an email to customer with the order information.
	- Payload
		```js
		{
			to:  string;
			subject:  string;
			text:  string;
			templateName:  string;
			data:  object;
		}
		```
		- HTML Template name ``user_purchase_notification`` file location ``src/templates/user_purchase_notification.html``
		- The **data** object will be used to compile the html template using lodash function ``_.template()``

- ***POST /sendemail/user-completed-course-notification***
	- Description: It sends an email to the customer to notify of course completion, including information about the score obtained if the customer made a test. In case the user has earned a certificate you can pass a list of encoded files, the service will send them as attachments.
	- Payload
		```js
		{
		  to: string;
		  subject: string;
		  text: string;
		  templateName: string;
		  data: object;
		  attachments: Array<{ filename?: string; content: string }>;
		}
		```
		- HTML Template name ``user_completed_course_notification`` file location ``src/templates/user_completed_course_notification.html``
		- The **data** object will be used to compile the html template using lodash function ``_.template()``
		-  The **attachments** array consist in a list of file names and the content of that file encoded in ``base64``.

3 - **Development Setup**
1. **TypeScript Installation**
You will need to have typescript installed and node, please refer the bellow link in order to install typescript and node:
	- [How to set up TypeScript with Node.js and Express - LogRocket Blog](https://blog.logrocket.com/how-to-set-up-node-typescript-express/)
3.  **Local Environment**
    
    -   Clone the repository and navigate into the project directory.
    -   Install dependencies with `yarn install` or `npm install`.
    -   Use `nodemon` to start the development server with nodemon, watching for TypeScript changes.
4.  **Nodemon Configuration**
    
    -   `nodemon.json` is configured to watch the `src` directory for changes and restart the server accordingly.

4 - **Aditional services**
It is included a service to download files from digital ocean spaces, in case you need it, you can find it in this location ``src/services/spaces.service.ts``. The intentions for this service is to have the possibility to download files from blob storage and attach them to the email.
Prior to use it, you need to setup the bellow env vars.
```yml
# config for digital ocean spaces
DO_SPACE_ACCESS_KEY=
DO_SPACE_SECRET_KEY=
DO_SPACE_ENDPOINT=sfo3.digitaloceanspaces.com
DO_SPACE_CDN=
DO_SPACE_BUCKET=
```

5 - **Nodemailer  .env variables**
```yml
NODEMAILER_HOST=
NODEMAILER_PORT=
NODEMAILER_SECURE=
NODEMAILER_USER=
NODEMAILER_PASS=
NODEMAILER_SENDER_EMAIL=
```
6 - **Template framework**
The email templates were created using the ***Foundation framework***, it is a convenient for responsive emails and comply with email client's policies like GMAIL, for more information how to use it please visit: [Foundation for Emails | Responsive Email Templates (get.foundation)](https://get.foundation/emails/email-templates.html)
## License

This project is licensed under the MIT License.
INSERT INTO "supports"("title","support","createdAt","updatedAt") 
VALUES ('staff_support','<html> <head><style>p {  color: navy;  text-indent: 20px;  text-transform: initial;}</style></head><body><h3>About Staffs Listing</h3>
<p>This section shows the list of all the staff created by Admin. To create staff User/Admin can click on the Add Staff button. It navigates to the add staff page. On the page admin can able to see some fields that he has to fill in to create staff that will belong to him. i.e. Username - Name of the staff, Email - Email of the staff, Password and Confirm password and select store - Admin has to select a store to save staff so that staff can be assigned to the store. One staff can be also assigned to multiple stores. After the creation of staff, login details of the staff will be mailed to the staff email which is used while registering staff. The staff uses that login credentials to log in and access his account. Staff can only access some of the menu i.e rack and staff. The first name of the staff name will be the admin name to make sure that the staff belongs to a certain admin. Note: Admin cannot able to create two staff with the same name and email address. If the admin wants to add, then the existing staff name should be changed or the staff should be deleted.</p><p> &#8226; With the Click of the pen icon users can able to edit their staff record i.e. Rename their staff name, 
Change email address, Change password and change their store. After the update the staff record will be updated as per your new details</p><p>&#8226; On Click of delete icon(Dustbin) deletes the staff and staff will be not available in any of your stores</p></body></html>',NOW(),NOW()),
('racks_support','<html> <head><style>p {  color: navy;  text-indent: 20px;  text-transform: initial;}</style></head><body><h3>About Racks Listing</h3><p>This section shows the list of all racks that are available in your stores around the application. Users can create racks by clicking on the Add Rack button. It navigates the add rack screen and some input boxes are available to fill i.e. Name - Name of your Rack, No. of Rows and Columns - Enter number how many trays the user wanted inside the rack, Store - User has to select the store from the dropdown to make sure that rack is going to present under which store. After the rack creation, it will be listed under this section.</p><p> &#8226; On click of pen icon user can able to edit their rack i.e Rename their rack, change rows and columns i.e reduce or increase the tray counts and user can change the store of the rack if the rack is shifted or not available in the existing sore.</p><p>&#8226; With on Click of the delete icon(Dustbin icon), user can able to delete their rack. Note: It also deletes the associated trays and their products inside the trays.</p><p>&#8226; On Click of View Tray(Eye icon) it shows the view of your tray inside your rack </p></body></html>',NOW(),NOW()),
('translate_support','<html> <head><style>p {  color: navy;  text-indent: 20px;  text-transform: initial;}</style></head><body><h3>About Translate Listing</h3><p>This section shows the list of all the menus that are available all over the application Eg: Home & Racks. You can modify your menu to whatever users like and it will applied all over the application. For example, you can rename your Racks as a Cupboard in the value input box available at the click of the pen icon and update the menu, It gets updated all over the application. The word Racks will be replaced with Cupboard all over the application wherever the Racks word is present. For Example:- Create Racks will be renamed as Create Cupboard.</p>
<p> &#8226; On the Click of the pen icon user can able to see a popup window containing the key and value in the pop-up window. The value part can be edited and the key remains the same. The user can type the replacement word for the corresponding inside the value input box. For example, Users can name their Racks as a Cupboard in the value box and it gets applied all over the application.</p><p>&#8226; With on Click of the Delete icon(Dustbin icon) user can able to delete the menu it gets deleted all over the application. For Eg: If the user deletes the Staff menu it gets deleted and the Staff menu wont be available for the user. If the user wants to create the staff menu once again after the deletion the user has to create a new translation key and value pair by clicking on the Add row button. The user can able to pop up a window with two inputs available i.e. Key and Value. If the user wants to add the same staff menu as the old one user has to enter the old key and value pair which was available for the staff and save it the staff menu will be available. If the user creates a staff with a new key and value the menu will be created as a new menu and the user will not able to see the old Staff menu which had a Staff listing.</p><p>&#8226; On Clicking the Add Row button user can able to see a popup window i.e Create Translate with Key and Value input boxes to fill. Users can add their Key and Value to use all over the application. For Eg:- When the user logs in user can able to see the dropdown name 'Template' beside the Stores menu. If the user wants to rename it as a product rather than a template user has to create a new Key and Value as 'Product' for both Key and Value and click add user can able to see the Key and Value in the listing that has been added and 'Template' will be replace with 'Product'.</p></body></html>',NOW(),NOW()),
('store_support','<html> <head><style>p {  color: navy;  text-indent: 20px;  text-transform: initial;}</style></head><body><h3>About  Stores Listing</h3><p>This section shows the list of all Stores that user is created. To create a store user should click on Add Store in this page. User can see add store page with two fields i.e. Storename - name of your store and address - adress of your store after on click of the save the saved store will get listed in this section. A User can create maximun of10 stores.Store is used to create Racks and Staffs</p><p> &#8226; On Click of pen icon user can able to edit your store i.e Rename your store, Change your address and update.</p><p>&#8226; On Click of delete icon(Dustbin) deletes the store and its associate Racks, Trays and Products</p><p>&#8226; On Click of Notification icon(Bell) it shows the notification added to this store </p></body></html>',NOW(),NOW()),
('template_support','<html> <head><style>p {  color: navy;  text-indent: 20px;  text-transform: initial;}</style></head><body><h3>About Templates Listing</h3><p>This section shows the list of all the templates available for the user to add products to it. As an application owner, I call it a template listing but the user can change the name as the user wishes in the translate section Eg. Define Products. In this section, you can rename your templates available on this page as you like by clicking on the pen icon. For example, users can rename their template as kitchen appliances and add kitchen products to it on a different page. Users can also change their description as they wish.</p><p> &#8226; On Clicking of pen icon user will be navigated to the Product Fields Builder screen. In that screen, users can rename their template name as they wish Eg.kitchen appliances. To rename their template user to click on the pen icon available beside Name input. The input box gets enabled and the user can rename their template/Product name and save the name by clicking of save button beside the Name input box users template name is renamed. There will be plenty of inputs available on the left side of the screen used to add fields for the product. For eg: If the user adds a product should have a name, quantity and description. For that users can choose their inputs from the left drag and drop to the right below the description field. Users can also modify their input that is dragged by clicking on the down arrow on the field that the user has dropped Click on the save below the drop area and save the template with whatever the changes the user made. To save the description user has rewrite their description and click the save button below drop i.e below the description field </p><p>&#8226; On Click of delete icon(Dustbin) delete the template and the product available inside the template. Once the template is deleted user cannot add new template so please be careful while deleting the template</p></body></html>',NOW(),NOW()),
('product_support','<html> <head><style>p {  color: navy;  text-indent: 20px;  text-transform: initial;}</style></head><body><h3>About Products Listing</h3><p>This section shows the list of Products that user added inside the templates. To add products user can click on Add New product it navigates to add product page where user can add thier product up filling up the fields and save your product.These fields are available form Product Fields Builder screen where user creates own fields by drag and drop. User can n number of products inside thier template. These created products are used to add into the tray inside the rack.</p><p> &#8226; On the Click of the pen icon navigates to edit product page where user can edit thier product name and other fields added by the user and update its latest name and quantity.</p><p>&#8226; With on Click of the delete icon(Dustbin) user can able to delete the product. Once the product is deleted it also gets deleted in its associted rack as well as tray.</p></body></html>',NOW(),NOW()),
('trayview_support','<html> <head><style>p {  color: navy;  text-indent: 20px;  text-transform: initial;}</style></head><body><h3>About Trays View</h3><p>This section shows the Trays view in which the user created while creating the rack. when the user clicks the tray i.e r0c0 User can do some certain operation i.e Add product to thier tray shows the quantity of product, Copy thier tray, Delete thier tray, Add picture to thier tray, Add color to thier tray, Rename thier tray and change thier tray layout by dragging here and there in the screen</p></body></html>',NOW(),NOW()),
('notification_support','<html> <head><style>p {  color: navy;  text-indent: 20px;  text-transform: initial;}</style></head><body><h3>About Notification Settings Listing</h3><p>This section shows the list of notification settings added to the corresponding store. To add a notification user can click on the Add Notification button. Users have to fill in the fields to save notification settings i.e. setting name - the name of the notification, To - email address, No. of remainders and time interval bw, days choose days. After creating a notification settings to the store it acts like a notification to the store while adding the products inside the tray user can select notification to the product so that the user will get mail if the quantity of the the products becomes low based on the notification settings. For example, the user creates store and adds a notification to it i.e. Setting Name - Low on Apples, Email - user email, No.of.Remainder - 1 Day and Time interval between Remainders - 2 days. While creating products the tray user can able to see add notifications to the product. User adds notifications by entering the Upper limit, Lower limit and notification setting which is Low on Apples created by the user. If the products quantity goes below the lower limit user gets notified by mail. If the user didnt update the quantity user will get mail after 2 days which is based Time interval between Remainders. If the user updates the quantity the mail will be stopped.</p></body></html>',NOW(),NOW()),
('trayedit_support','<html> <head><style>p {  color: navy;  text-indent: 20px;  text-transform: initial;}</style></head><body><h3>About Tray Edit</h3><p>This section shows the editing of tray section. The user can do some certain operations available on the top of the tray and inside the tray.</p><p> &#8226; Add - on click of the tray user can see some operations one of them is Add. On click of the add it navigates to another page where the user can choose the template and add products to the selected tray. After the product is added and the User comes back to the tray screen user can see the number of quantities he added to the outside of the tray.</p><p> &#8226; Copy - With the click of the tray, the user can see some operations one of them is Copy. On click of the copy the corresponding rack is duplicated and creates copy of the tray. It only copies the properties of the tray but not the product inside the tray. For Eg: The user clicks on the tray r0c0 and clicks on the copy it will create another tray with the name r0c0 with its properties.</p><p> &#8226; Delete - With the click of the tray, the user can see some operations one of them is Delete. On click of the delete, the corresponding rack is deleted with its properties and products inside the tray.</p><p> &#8226; Searchable - With the click of the tray, the user can see some operations one of them is Searchable. Default it will be searchable so that the user can able to search the tray. If the user unchecks the checkbox user cannot able to search the tray.</p><p> &#8226; Save Layout - With the click of the tray, the user can see some operations one of them is Save Layout. The user can arrange the trays by dragging them here and there on the screen once the user sets the trays layout and clicks on save layout the tray layout will be saved and remain the same as the user arranged it.</p><p> &#8226; Some of the operations present inside the tray are renaming your tray,Uploading pictures to your tray, and adding color to the tray. To rename the tray user can click on the existing name (Eg: r0c0) rename the tray and click outside of the tray, tray name gets saved. To upload a picture to the tray user has to enlargethe tray and click on the default image tray the user can upload a picture. To add color to the tray user has to click on the default color(blue) present in the tray the color picker pops up and the user can pick the color he likes and the color will be changed.</p></body></html>',NOW(),NOW());

INSERT INTO "plans" ("id", "name", "noOfUsers", "noOfRacks", "noOfItemTypes", "rate", "planImg", "createdAt", "updatedAt") VALUES (1, 'Personal', 1, 2, 3, 500, '', NOW(),NOW()),
(2, 'Company/Traders', 5, 10, 10, 1000, '', NOW(),NOW()),
(3, 'Distributors', 25, 50, 20, 2000, '', NOW(),NOW());

INSERT INTO "roles" ("id", "name", "createdAt", "updatedAt") VALUES (1, 'Admin', NOW(),NOW()),
(2, 'SuperAdmin', NOW(),NOW()),
(3, 'Staff', NOW(),NOW());

INSERT INTO "menus" ("id", "label", "action", "roleId", "clientFk", "templateID", "menu_fk", "createdAt", "updatedAt") 
VALUES (1, 'DashBoard', '/dashboard', 2, NULL, NULL, NULL, NOW(),NOW()),
(2, 'Home', '/template', 2, NULL, NULL, NULL, NOW(),NOW()),
(3, 'Staff', '/staff', 2, NULL, NULL, NULL, NOW(),NOW()),
(4, 'Racks', '/racks', 2, NULL, NULL, NULL, NOW(),NOW()),
(5, 'Translate', '/Translate', 2, NULL, NULL, NULL, NOW(),NOW());



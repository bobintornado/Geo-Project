package system;

public class Message {
	public static final String SUCCESS = "success";
	
	//Servlet
	public static final String SEP = ": ";
	public static final String OR = " or ";
	public static final String AND = " and ";
	public static final String INPUT = "Input: ";
	
	//System controller
	public static final String CREATESYSTEMADMINEXP = "SystemController.createSystemAdmin: ";
	public static final String SYSTEMAUTHFAIL = "System authentication fail!";
	
	//Application controller
	public static final String CREATEAPPEXP = "ApplicationController.createApplication: ";
	public static final String GETAPPEXP = "ApplicationController.getApplicationById: ";
	public static final String UPDATEAPPPAY = "ApplicationController.updateAppPaymentPlan: ";
	public static final String EDITAPPEXP = "ApplicationController.editApplication: ";
	public static final String DELETEAPPEXP = "ApplicationController.deleteApplication: ";
	public static final String UPPAYMENTEXP = "ApplicationController.updateAppPaymentPlan: ";
	public static final String GETALLAPPSEXP = "ApplicationController.getAllApps: ";
	public static final String GETDASHBOARDEXP = "ApplicationController.getDashboardInfoByAppId: ";
	public static final String GETPAYMENTHISEXP = "ApplicationController.getPaymentHistory: ";
	public static final String GETAPPUSERSEXP = "ApplicationController.getApplicationUsers: ";
	public static final String APPNOTEXIST = "The application does not exist!";
	public static final String APPEXIST = "The application exist!";
	public static final String NOTADMINUSER = "You are not admin user for this application!";
	public static final String APPUSERNOTEXIT = "The app or user are not exit!";
	public static final String ADMINAPPNOTEXIT = "Authentication Error!";
	
	//User controller
	public static final String CREATEUSEREXP = "UserController.createUser: ";
	public static final String EDITUSEREXP = "UserController.editUser: ";
	public static final String GETUSEREXP = "UserController.getUser: ";
	public static final String CHECKINEXP = "UserController.checkIn: ";
	public static final String GETCONTACTSEXP = "UserController.getContacts: ";
	public static final String PEROIDSCHEEXP = "UserController.getPeriodSchedule: ";
	public static final String GETUSERSTATUSEXP = "UserController.getUserWorkingStatus: ";
	public static final String EDITPROFILEEXP = "UserController.editProfile: ";
	public static final String GETPROFILEEXP = "UserController.getProfile: ";
	public static final String CREATEPROFILEEXP = "UserController.createProfile: ";
	public static final String GETCVBYPROFILEEXP = "UserController.getCVByProfileId: ";
	public static final String CREATEEMPLOYEECVEXP = "UserController.createCV: ";
	public static final String EDITEMPLOYEECVEXP = "UserController.editCV: ";
	public static final String DELETECVEXP = "UserController.deleteCV: ";
	
	public static final String USEREXIST = "The email registered!";
	public static final String USERNOTEXIST = "The user not exist!";
	public static final String USERNOTINAPP = "The user is not belongs to this application";
	public static final String WRONGPASSWORD = "The password is not correct!";
	
	public static final String REALEVENTEXIST = "The real event has already exist!";
	public static final String REALEVENTNOTEXIST = "The real event does not exist!";
	
	public static final String PROFILENOTEXIST = "The profile does not exist!";
	public static final String EMPLOYEECVNOTEXIST = "The employee CV does not exist!";
	
	public static final String EXCEEDUSERLIMIT = "Exceed the user available limit! Please up grade your plan.";
	
	//Admin controller
	public static final String ADMINLOGINEXP = "AdminController.adminLogin: ";
	public static final String CREATELEAVEOBJEXP = "AdminController.createLeaveobj: ";
	public static final String EDITLEAVEOBJEXP = "AdminController.editLeaveobj: ";
	public static final String DELLEAVEOBJEXP = "AdminController.deleteLeaveobj: ";
	public static final String GETALLLEAVEOBJSEXP = "AdminController.getAllLeaveobjs: ";
	public static final String CREATEENTITLEMENTEXP = "AdminController.createEntitlement: ";
	public static final String EDITENTITLEMENTEXP = "AdminController.editEntitlement: ";
	public static final String DELENTITLEMENTEXP = "AdminController.deleteEntitlement: ";
	public static final String GETALLENTITLEMENTSEXP = "AdminController.getAllEntitlements: ";
	public static final String CREATELEAVEPLANEXP = "AdminController.createLeavePlan: ";
	public static final String EDITLEAVEPLANEXP = "AdminController.editLeavePlan: ";
	public static final String DELETELEAVEPLANEXP = "AdminController.deleteLeavePlan: ";
	public static final String GETALLLEAVEPLANSEXP = "AdminController.getAllLeavePlans: ";
	public static final String CREATEDESIGNATIONEXP = "AdminController.createDesignation: ";
	public static final String EDITDESIGNATIONEXP = "AdminController.editDesignation: ";
	public static final String DELDESIGNATIONEXP = "AdminController.deleteDesignation: ";
	public static final String GETALLDESIGNATIONSEXP = "AdminController.getAllDesignations: ";
	public static final String CREATEAPPRAISALEXP = "AdminController.createEmployeeAppraisal: ";
	public static final String EDITAPPRAISALEXP = "AdminController.editEmployeeAppraisal: ";
	public static final String DELETEAPPRAISALEXP = "AdminController.deleteAppraisal: ";
	
	public static final String NOTADMIN = "You are not an administrator!";
	public static final String LEAVEOBJNOTEXIST = "The leaveobj does not exist!";
	public static final String LEAVEOBJEXIST = "The leave name has already exist!";
	public static final String ENTITLEMENTNOTEXIST = "The entitlement does not exist!";
	public static final String ENTITLEMENTHASDEPENDENCY = "Make sure this template has no dependencies!";
	public static final String LEAVEOBJHASDEPENDENCY = "Make sure this leave has no dependencies!";
	public static final String DESIGNATIONHASDEPENDENCY = "Make sure this designation has no dependencies!";
	public static final String ENTITLEMENTEXIST = "The entitlement has already exist!";
	public static final String SCHEDULEERROR = "The schedule template is not a valid json array format";
	public static final String LEAVEPLANNOTEXIST = "The leavePlan does not exist!";
	public static final String LEAVEPLANEXIST= "The leavePlan has already exist!";
	public static final String DESIGNATIONNOTEXIST = "The designation does not exist!";
	public static final String DESIGNATIONEXIST = "The designation has already exist!";
	public static final String PARENTNOTEXIST = "The parent designation does not exist!";
	public static final String WRONGAPP = "You are not a user in this application!";
	
	//Leave controller
	public static final String APPLYLEAVEEXP = "LeaveController.applyLeave: ";
	public static final String EDITLEAVEEXP = "LeaveController.editLeave: ";
	public static final String APPROVELEAVEEXP = "LeaveController.approveLeave: ";
	public static final String REJECTLEAVEEXP = "LeaveController.rejectLeave: ";
	public static final String GETLEAVESEXP = "LeaveController.getAllLeaves: ";
	
	public static final String USERLEAVENOTEXIST = "The userLeave does not exist!";
	public static final String USERLEAVEEXIST = "You have leave applied during this period!";
	public static final String NOEVENTFOUND = "You do not have any working schedule during this period!";
	public static final String RUNOUTOFLEAVE = "You leaves cannot exceed the limit!";
	
	public static final String NOTODO = "Do not find any operation!";
	
	
	//Event controller
	public static final String CREATEEVENTEXP = "EventController.createEvent: ";
	public static final String RECREATEEXP = "EventController.recreateEvent: ";
	public static final String EDITEVENTEXP = "EventController.editEvent: ";
	public static final String EVENTNOTEXIT = "The event does not exist!";
	
	
	//Uploader
	public static final String DIRNOTEXIST = "The directory does not exist!";
	public static final String FOLDERNOTEXIST = "The folder does not exist!";
	public static final String FILETOOLARGE1 = "The file too large (1)!";
	public static final String FILETOOLARGE2 = "The file too large (2)!";
	public static final String NOUPLOADREQUEST = "No upload request found!";
	
	//Reconnected
	public static final String RECONNECT = "Reconnect!";
	public static final String RECONNECTSUCCESS = "Reconnect success!";
	
	//Viatick Controller
	public static final String CUPAYMENTPLANEXP = "ViatickController.createUpdatePaymentPlan: ";
	public static final String UPDATEBEACONEXP = "ViatickController.updateBeacon: ";
}

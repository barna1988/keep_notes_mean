// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  reminder_snooze_minutes: 20,
  url_user_register : 'http://localhost:8000/users/register',
  url_user_login : 'http://localhost:8000/users/login',
  url_user_getusers : 'http://localhost:8000/users/getUsers',
  url_user_auth : 'http://localhost:8000/auth/',
  url_notes_create_get : 'http://localhost:8000/notes/',
  url_notes_update : 'http://localhost:8000/notes/',
  url_notes_add_favourite : 'http://localhost:8000/notes/addFavorites',
  url_notes_remove_favourite : 'http://localhost:8000/notes/removeFavorites',
  url_notes_delete : 'http://localhost:8000/notes/delete',
  url_notes_share : 'http://localhost:8000/notes/share',
  url_notes_addGroup : 'http://localhost:8000/notes/addGroup',
  url_notification_gateway : 'http://localhost:8000/notifications',
  // url_notification_reminder : 'http://localhost:3003/api/v1/notifications/reminders',
  // url_notification : 'http://localhost:3003/api/v1/notifications'
  url_notification_reminder : 'http://localhost:8000/notifications/reminders',
  url_notification : 'hhttp://localhost:8000/notifications/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

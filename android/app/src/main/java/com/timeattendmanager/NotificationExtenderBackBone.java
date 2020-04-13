package com.threepp.tamanager;

import android.app.Application;

import com.onesignal.OSNotificationPayload;
import com.onesignal.OSNotificationReceivedResult;
import com.onesignal.NotificationExtenderService;

public class NotificationExtenderBackBone extends NotificationExtenderService {
   @Override
   protected boolean onNotificationProcessing(OSNotificationReceivedResult receivedResult) {
     	// Read properties from result.

      // Return true to stop the notification from displaying.
      return false;
   }
}

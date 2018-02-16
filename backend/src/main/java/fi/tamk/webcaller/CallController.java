package fi.tamk.webcaller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.twilio.sdk.TwilioRestClient;
import com.twilio.sdk.TwilioRestException;
import com.twilio.sdk.resource.factory.MessageFactory;
import com.twilio.sdk.resource.instance.Message;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import com.twilio.sdk.resource.factory.CallFactory;
import com.twilio.sdk.resource.instance.Call;

import java.util.ArrayList;
import java.util.List;

@Controller
public class CallController {

    public static final String ACCOUNT_SID = "AC4a59caf3e6d9cb3e8aa3920d03447b04";
    public static final String AUTH_TOKEN = "0e337a0dd91ddb837ed3d4370ade02e9";
    public static final String TWILIO_NUMBER = "+358248092145";

    @RequestMapping("/testcall")
    public String call(){
        sendSMS();
        return "testcall";
    }

    public void sendSMS() {
        try {
            TwilioRestClient client = new TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN);

            // Build a filter for the MessageList
            List<NameValuePair> params = new ArrayList<NameValuePair>();
            params.add(new BasicNameValuePair("Body", "Hello, World!"));
            params.add(new BasicNameValuePair("To", "+358400366613")); //Add real number here
            params.add(new BasicNameValuePair("From", TWILIO_NUMBER));

            MessageFactory messageFactory = client.getAccount().getMessageFactory();
            Message message = messageFactory.create(params);
            System.out.println(message.getSid());
        }
        catch (TwilioRestException e) {
            System.out.println(e.getErrorMessage());
        }
    }

    public void makeCall() {
        
    }

}

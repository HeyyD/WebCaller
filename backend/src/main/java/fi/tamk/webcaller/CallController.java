package fi.tamk.webcaller;

import com.twilio.sdk.verbs.Dial;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.twilio.sdk.TwilioRestClient;
import com.twilio.sdk.TwilioRestException;
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
        makeCall();
        return "testcall";
    }


    public void makeCall() {
        try {
            TwilioRestClient client = new TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN);

            List<NameValuePair> params = new ArrayList<NameValuePair>();
            Dial dial = new Dial();
            System.out.println(dial.toString());
            params.add(new BasicNameValuePair("Url", "http://koti.tamk.fi/~c6samhau/call.xml"));
            params.add(new BasicNameValuePair("To", "+358400366613")); //Add real number here
            params.add(new BasicNameValuePair("From", TWILIO_NUMBER));

            CallFactory callFactory = client.getAccount().getCallFactory();

            Call call = callFactory.create(params);
        }
        catch (TwilioRestException e) {
            System.out.println(e.getErrorMessage());
        }
    }

}

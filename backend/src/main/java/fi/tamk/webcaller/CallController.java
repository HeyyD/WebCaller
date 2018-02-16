package fi.tamk.webcaller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class CallController {

    public static final String ACCOUNT_SID = "AC4a59caf3e6d9cb3e8aa3920d03447b04";
    public static final String AUTH_TOKEN = "0e337a0dd91ddb837ed3d4370ade02e9";
    public static final String TWILIO_NUMBER = "+358248092145";

    @RequestMapping("/testcall")
    public String call(){
        return "testcall";
    }
}

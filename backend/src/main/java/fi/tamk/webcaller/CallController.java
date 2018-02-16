package fi.tamk.webcaller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class CallController {

    @RequestMapping("/testcall")
    public String call(){
        return "testcall";
    }
}

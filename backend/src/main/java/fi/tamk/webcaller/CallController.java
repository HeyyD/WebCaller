package fi.tamk.webcaller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CallController {

    @RequestMapping("/greeting")
    public String call(){
        return "Hello world!";
    }
}

package com.dilkerwinter.financemanager.finance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/Finance")
public class FinanceControler {

    private final FinanceService financeService;

    @Autowired
    public FinanceControler(FinanceService financeService) {
        this.financeService = financeService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/newFinance")
    public ResponseEntity<Object> createFinance(@RequestBody Finance finance){
        return financeService.newFinance(finance);
    }
    
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/getFinancebyUserId/{userId}")
    public ResponseEntity<Object> GetFinancebyUserId(@PathVariable("userId") Integer userId){
        return financeService.GetFinanceByUserId(userId);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PatchMapping("/updateFinance")
    public ResponseEntity<Object> updateFinance(@RequestBody Finance finance){
        return financeService.UpdateFinance(finance);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/deleteFinance/{financeId}")
    public ResponseEntity<Object> deleteFinance(@PathVariable("financeId") Integer financeId){
        return financeService.DeleteFinance(financeId);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/getFinancebyUserIdOrderbyDate/{userId}")
    public ResponseEntity<Object> GetFinancebyUserIdOrderbyDate(@PathVariable("userId") Integer userId){
        return financeService.getFinanceByUserIdOrderByDate(userId);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/getFinancebyDate")
    public ResponseEntity<Object> getFinancesByUserIdAndMonthAndYear(
            @RequestParam("userId") Integer userId,
            @RequestParam("month") Integer month,
            @RequestParam("year") Integer year) {
        return financeService.findByUserIdAndMonthAndYear(userId, month, year);
    }
}

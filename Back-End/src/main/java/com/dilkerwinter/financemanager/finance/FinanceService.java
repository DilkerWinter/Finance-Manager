package com.dilkerwinter.financemanager.finance;

import com.dilkerwinter.financemanager.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class FinanceService {

    private final FinanceRepository financeRepository;

    @Autowired
    public FinanceService(FinanceRepository financeRepository, UserService userService) {
        this.financeRepository = financeRepository;
    }

    public ResponseEntity<Object> newFinance(Finance finance) {
        financeRepository.save(finance);
        return new ResponseEntity<>(finance , HttpStatus.CREATED);
    }

    public ResponseEntity<Object> GetFinanceByUserId(Integer userId) {
        List<Finance> userFinances = financeRepository.findByUserId(userId);
        if (userFinances.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or Finance not found");
        }
        return new ResponseEntity<>(userFinances, HttpStatus.OK);
    }

    public ResponseEntity<Object> UpdateFinance(Finance finance) {
        Optional<Finance> userFinance = financeRepository.findById(finance.getId());
        if (userFinance.isPresent()) {
            financeRepository.save(finance);
            return new ResponseEntity<>(finance , HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Finance not found");
    }

    public ResponseEntity<Object> DeleteFinance(Integer id) {
        Optional<Finance> userFinance = financeRepository.findById(id);
        if (userFinance.isPresent()) {
            financeRepository.delete(financeRepository.findById(id).get());
            return ResponseEntity.ok("Finance deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Finance not found");
    }

    public ResponseEntity<Object> getFinanceByUserIdOrderByDate(Integer userId) {
        List<Finance> userFinances = financeRepository.findByUserIdOrderByDate(userId);
        if (userFinances.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or Finance not found");
        }
        return new ResponseEntity<>(userFinances, HttpStatus.OK);
    }
}

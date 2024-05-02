package com.dilkerwinter.financemanager.finance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FinanceRepository extends JpaRepository<Finance, Integer> {

    @Query("SELECT f FROM Finance f WHERE f.user.id = ?1")
    List<Finance> findByUserId(Integer userId);

}

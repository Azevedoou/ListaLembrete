package br.com.dtilembrete.projetodtilembrete.DAO;

import org.springframework.data.repository.CrudRepository;
import br.com.dtilembrete.projetodtilembrete.entities.Lembrete;

// Interface de controle CRUD.
public interface ILembrete extends CrudRepository<Lembrete, Integer>{

}

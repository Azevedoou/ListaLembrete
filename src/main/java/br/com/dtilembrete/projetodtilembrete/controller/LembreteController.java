package br.com.dtilembrete.projetodtilembrete.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.dtilembrete.projetodtilembrete.DAO.ILembrete;
import br.com.dtilembrete.projetodtilembrete.entities.Lembrete;

// Por padrão, o navegador faz o Get, ao invéz do Post, Put etc.
@RestController
@CrossOrigin("*")
@RequestMapping("/lembretes")
public class LembreteController {
	
	// Autowired faz a injeção automatica das dependências do CrudRepository.
	@Autowired
	private ILembrete dao;
	
	// Get
	@GetMapping
	public List<Lembrete> listaLembretes(){
		return (List<Lembrete>) dao.findAll();
	}
	
	// Create
	@PostMapping
	public Lembrete criarLembrete(@RequestBody Lembrete lembrete) {
		System.out.println("Recebendo lembrete: " + lembrete.getId() + " " + lembrete.getNome() + " " + lembrete.getData());
		Lembrete novoLembrete = dao.save(lembrete);
		return novoLembrete;
	}
	
	// Para futura implementação de Update 
	@PutMapping
	public Lembrete updateLembrete(@RequestBody Lembrete lembrete) {
		Lembrete novoLembrete = dao.save(lembrete);
		return novoLembrete;
	}
	
	// Envio do ID do lembrete no ".../lembretes/ID" e desas forma é realizado a remoção
	@DeleteMapping("/{id}")
	public Optional<Lembrete> deletaLembrete(@PathVariable Integer id) {
		Optional<Lembrete> lembrete = dao.findById(id);
		dao.deleteById(id);
		return lembrete;
	}
}

package com.packt.cantata.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.packt.cantata.domain.Performance;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Perform_time {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int pt_no;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pf_code")
	private Performance pf_code;
	
	@Column(nullable=false)
	private Date pt_date, pt_time;
	
	private Boolean pt_status;
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "pt_no")
	private List<Ticket> ticket;

	public Perform_time(int pt_no, Performance pf_code, Date pt_date, Date pt_time, Boolean pt_status) {
		super();
		this.pt_no = pt_no;
		this.pf_code = pf_code;
		this.pt_date = pt_date;
		this.pt_time = pt_time;
		this.pt_status = pt_status;
	}
}

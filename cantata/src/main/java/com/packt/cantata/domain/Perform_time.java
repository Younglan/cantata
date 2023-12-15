package com.packt.cantata.domain;

import java.time.LocalDateTime;
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

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class Perform_time {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int ptNo;
	
	@ManyToOne
	@JoinColumn(name = "pfCode")
	private Performance pfCode;
	
	@Column
	private Date ptDate;
	
	@Column(columnDefinition = "boolean default true",nullable = false)
	private Boolean ptStatus = true;
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "pt_no")
	private List<Ticket> ticket;

	public Perform_time(Performance pfCode, Date ptDate, Boolean ptStatus) {
		super();
		this.pfCode = pfCode;
		this.ptDate = ptDate;
		this.ptStatus = ptStatus;
	}

	public Perform_time(Performance pfCode, Date ptDate) {
		super();
		this.pfCode = pfCode;
		this.ptDate = ptDate;
	}
}


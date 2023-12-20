package com.packt.cantata.domain;

import java.util.ArrayList;
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
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Performance {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="pfCode")
	private Long pfCode;
	
	@Column(nullable = true)
	private String pfTitle;
	
	@Column(nullable = true)
	private String pfCate, agency, agencyTel;
	
	@Column(nullable = true)
	private String pfPoster;
	
//	@Column(nullable = true)
//	private String pfEximg;
	
	@Column(nullable = true)
	@Lob
	private String	pfExplan, pfNotice;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date pfStart;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date pfEnd;
	
	private int pfRuntime, R, S, A, B, C, D;
	
	@Column(columnDefinition = "boolean default true",nullable = false)
	private Boolean pfStatus = true;
	
	@ManyToOne
	@JoinColumn(name = "plantNo")
	private Plant plantNo;

	@JsonIgnore
	@OneToMany(mappedBy = "performance", cascade = CascadeType.ALL)
//    @JsonBackReference(value = "performance-files")
    private List<File> files = new ArrayList<>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "pfCode", cascade = CascadeType.ALL)
	private List<Perform_time> performTimes;

	
	public Performance( String pfCate, String pfTitle, String agency,String agencyTel, String pfPoster, 
			String pfExplan, String pfNotice, Date pfStart, Date pfEnd, int pfRuntime, int R, int S,int A, int B, int C,
			int D,Plant plantNo) {
		super();
		
		this.pfCate = pfCate;
		this.pfTitle = pfTitle;
		this.agency = agency;
		this.agencyTel = agencyTel;
		this.pfPoster = pfPoster;
//		this.pfEximg = pfEximg;
		this.pfExplan = pfExplan;
		this.pfNotice = pfNotice;
		this.pfStart = pfStart;
		this.pfEnd = pfEnd;
		this.pfRuntime = pfRuntime;
		this.R = R;
		this.S = S;
		this.A = A;
		this.B = B;
		this.C = C;
		this.D = D;
//		this.pfStatus = pfStatus;
		this.plantNo = plantNo;	
	}
	public Performance(String pfCate, String pfTitle, String agency, String pfPoster, String pfExplan) {
		super();
		this.pfCate = pfCate;
		this.pfTitle = pfTitle;
		this.agency = agency;
		this.pfPoster = pfPoster;
		this.pfExplan = pfExplan;
	}
	
	

	@Override
	public String toString() {
		return "Performance [pfCode=" + pfCode + ", pfCate=" + pfCate + ", pfTitle=" + pfTitle + ", agency=" + agency
				+ ", pfPoster=" + pfPoster + ", pfExplan=" + pfExplan + ", pfNotice="
				+ pfNotice + ", pfStart=" + pfStart + ", pfEnd=" + pfEnd + ", pfRuntime=" + pfRuntime + ", R="
				+ R + ", S=" + S + ", A=" + A + ", B=" + B + ", C=" + C + ", D=" + D
				+ ", pfStatus=" + pfStatus + ", plantNo=" + plantNo + ", perform_times=" + performTimes + "]";
	}
	public Performance(String pfCate, String pfTitle, String agency, int pfRuntime) {
		super();
		this.pfCate = pfCate;
		this.pfTitle = pfTitle;
		this.agency = agency;
		this.pfRuntime = pfRuntime;
	}
	

}

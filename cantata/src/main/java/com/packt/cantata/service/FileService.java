package com.packt.cantata.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

import lombok.RequiredArgsConstructor;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.packt.cantata.domain.*;
import com.packt.cantata.dto.PathAndEntities;

@Service
@RequiredArgsConstructor
public class FileService {
	
	private final FileRepository fileRepository;

    private final PerformanceRepository performanceRepository;
	
	@Value("${spring.cloud.gcp.storage.bucket}")
    private String bucketName;
	
	
	
	public List<Long> uploadToCloudAndGetFileNums(List<MultipartFile> files, String tableName, Long number) throws IOException {
        PathAndEntities pathAndEntities = determineMidPath(tableName, number);

        // Set up Google Cloud Storage
        Storage storage = StorageOptions.getDefaultInstance().getService();

        List<Long> uploadedFileNums = new ArrayList<>();

        for (MultipartFile file : files) {
        	System.out.println("@#@#@#@#@#@# MidPath : "+file.getOriginalFilename());
            String newFileName = pathAndEntities.getMidPath() + file.getOriginalFilename();
            String fileUrl = "https://storage.googleapis.com/" + bucketName + "/" + newFileName;
            BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, newFileName).build();
            Blob blob = storage.create(blobInfo, file.getBytes());

            File createfile = new File();
            createfile.setFileOriName(file.getOriginalFilename());
            createfile.setFileName(newFileName);
            createfile.setFileUri(fileUrl);
            createfile.setPerformance(pathAndEntities.getPerformance());
//            createfile.setMember(pathAndEntities.getMember());
//            createfile.setSpace(pathAndEntities.getSpace());
//            createfile.setEdu(pathAndEntities.getEdu());
//            createfile.setPost(pathAndEntities.getPost());
//            createfile.setEduHist(pathAndEntities.getEduHist());

            File savedFile = fileRepository.save(createfile);
            uploadedFileNums.add(savedFile.getFileNum());
        }

        return uploadedFileNums;
    }
	
	private PathAndEntities determineMidPath(String tableName, Long number) {
        PathAndEntities result = new PathAndEntities();
     
        Performance performance = null;
//        Member member = null;
//        Space space = null;
//        Edu edu = null;
//        EduHist eduHist = null;
//        Post post = null;
        String midPath = "";

        if (number == 0) {
            switch (tableName) {
	            case "performance":
	            	performance = performanceRepository.findTopByOrderByPfCodeDesc();
	                midPath = tableName + "/" + performance.getPfCode() + "/";
	                break;
//                case "member":
//                    member = memberRepository.findTopByOrderByMemNumDesc();
//                    midPath = tableName + "/" + member.getMemNum() + "/";
//                    break;
//                case "space":
//                    space = spaceRepository.findTopByOrderBySpaceNumDesc();
//                    midPath = tableName + "/" + space.getSpaceNum() + "/";
//                    break;
//                case "edu":
//                    edu = eduRepository.findTopByOrderByEduNumDesc();
//                    midPath = tableName + "/" + edu.getEduNum() + "/";
//                    break;
//                case "eduHist":
//                    eduHist = eduHistRepository.findTopByOrderByEduHistNumDesc();
//                    midPath = tableName + "/" + eduHist.getEduHistNum() + "/";
//                    break;
//                case "post":
//                    post = postRepository.findTopByOrderByPostNumDesc();
//                    midPath = tableName + "/" + post.getPostNum() + "/";
//                    break;
                default:
                    throw new IllegalArgumentException("Invalid table name: " + tableName);
            }
        } else {
            switch (tableName) {
	            case "performance":
//	            	performance = performanceRepository.findByPfCode(number);
//	                if (performance == null) {
	                    midPath = tableName + "/" +number + "/";
//	                }
	                break;
            
//                case "member":
//                    member = memberRepository.findByMemNum(number);
//                    if (member != null) {
//                        midPath = tableName + "/" + member.getMemNum() + "/";
//                    }
//                    break;
//                case "space":
//                    space = spaceRepository.findBySpaceNum(number);
//                    if (space != null) {
//                        midPath = tableName + "/" + space.getSpaceNum() + "/";
//                    }
//                    break;
//                case "edu":
//                    edu = eduRepository.findByEduNum(number);
//                    if (edu != null) {
//                        midPath = tableName + "/" + edu.getEduNum() + "/";
//                    }
//                    break;
//                case "eduHist":
//                    eduHist = eduHistRepository.findByEduHistNum(number);
//                    if (eduHist != null) {
//                        midPath = tableName + "/" + eduHist.getEduHistNum() + "/";
//                    }
//                    break;
//                case "post":
//                    post = postRepository.findByPostNum(number);
//                        midPath = tableName + "/" + number + "/";
//                    break;
                default:
                    throw new IllegalArgumentException("Invalid table name: " + tableName);
            }
        }
        result.setMidPath(midPath);
        result.setPerformance(performance);
//        result.setMember(member);
//        result.setSpace(space);
//        result.setEdu(edu);
//        result.setEduHist(eduHist);
//        result.setPost(post);

        return result;
    }
	
	

}
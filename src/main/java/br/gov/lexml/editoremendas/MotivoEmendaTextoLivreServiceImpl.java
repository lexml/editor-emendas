package br.gov.lexml.editoremendas;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class MotivoEmendaTextoLivreServiceImpl implements MotivoEmendaTextoLivreService {
    private final JavaMailSender mailSender;

    public MotivoEmendaTextoLivreServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendEmail(MotivoEmendaTextoLivre message) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        simpleMailMessage.setFrom("lexedit@senado.leg.br");
        simpleMailMessage.setTo("lexedit@senado.leg.br");
        simpleMailMessage.setSubject(message.ASSUNTO);
        simpleMailMessage.setText(message.getMensagem());
        
        mailSender.send(simpleMailMessage);
    }

}

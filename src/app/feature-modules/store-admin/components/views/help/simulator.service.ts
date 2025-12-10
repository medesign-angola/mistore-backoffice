import { Injectable } from "@angular/core";
import { HelpTabsEnum } from "@store/components/views/help/help-tabs.enum";
import { delay, Observable, of } from "rxjs";
import { HelpApiService } from "./help.api.service";
import { HelpContent } from "./help.models";

@Injectable({
    providedIn: HelpApiService
})
export class HelpSimulator {
    private contents: HelpContent = {
        [HelpTabsEnum.MY_ACCOUNT]: [
            {
                question: 'Posso editar os meus dados pessoais?',
                answer: 'Sim, podes editar as tuas informações pessoais, como nome, e-mail ou número de telefone, acedendo à área "Minha Conta" e clicando em "Editar Perfil".',
            },
            {
                question: 'Esqueci-me da minha palavra-passe. O que faço?',
                answer: 'Podes redefinir a tua palavra-passe clicando em “Esqueci-me da palavra-passe” na página de login. Receberás um e-mail com as instruções para criar uma nova.',
            },
            {
                question: 'Como posso eliminar a minha conta?',
                answer: 'Se desejares eliminar a tua conta permanentemente, entra em contacto com o nosso suporte. Após confirmação, todos os teus dados serão removidos de forma segura.',
            },
            {
                question: 'Posso alterar o meu endereço de e-mail?',
                answer: 'Sim, é possível alterar o endereço de e-mail utilizado para login nas configurações da tua conta. Apenas certifica-te de confirmar o novo e-mail.',
            },
            {
                question: 'Como ativo as notificações da conta?',
                answer: 'Na secção “Preferências”, podes escolher que tipos de notificações queres receber — por e-mail, SMS ou notificações push na aplicação.',
            },
        ],

        [HelpTabsEnum.REQUESTS]: [
            {
                question: 'Como faço um novo pedido?',
                answer: 'Seleciona os produtos desejados, adiciona-os ao carrinho e finaliza a compra seguindo os passos indicados no ecrã.',
            },
            {
                question: 'Posso cancelar um pedido após confirmar a compra?',
                answer: 'Sim, podes cancelar o pedido até que ele seja processado. Depois do envio, é necessário solicitar uma devolução.',
            },
            {
                question: 'Como acompanho o estado do meu pedido?',
                answer: 'Na secção “Os Meus Pedidos”, encontras o histórico de todas as compras e o estado de cada uma delas em tempo real.',
            },
            {
                question: 'O meu pedido foi rejeitado, o que aconteceu?',
                answer: 'Em alguns casos, o pagamento pode não ter sido autorizado ou o produto pode estar temporariamente indisponível. Verifica o e-mail para mais detalhes.',
            },
            {
                question: 'Posso alterar a morada de entrega após fazer o pedido?',
                answer: 'Podes alterar a morada apenas se o pedido ainda não tiver sido despachado. Contacta o suporte o quanto antes para atualizar a informação.',
            },
        ],

        [HelpTabsEnum.PAYMENTS]: [
            {
                question: 'Quais métodos de pagamento são aceites?',
                answer: 'Aceitamos cartões de crédito, débito, PayPal, MB Way e transferências bancárias.',
            },
            {
                question: 'O meu pagamento não foi processado. O que devo fazer?',
                answer: 'Verifica se os dados do cartão estão corretos e se há saldo disponível. Caso o problema persista, tenta outro método de pagamento.',
            },
            {
                question: 'É seguro pagar pelo site?',
                answer: 'Sim. Utilizamos encriptação SSL e protocolos de segurança atualizados para proteger todas as transações.',
            },
            {
                question: 'Posso pagar em prestações?',
                answer: 'Alguns produtos e métodos de pagamento oferecem a opção de parcelamento. Essa opção é exibida durante o checkout.',
            },
            {
                question: 'Quando o pagamento é confirmado?',
                answer: 'Pagamentos com cartão ou MB Way são confirmados imediatamente. Transferências bancárias podem demorar até 2 dias úteis.',
            },
        ],

        [HelpTabsEnum.SHIPPING]: [
            {
                question: 'Quais são os prazos de entrega?',
                answer: 'O prazo médio é de 2 a 5 dias úteis, dependendo da tua localização e do tipo de envio escolhido.',
            },
            {
                question: 'Como posso acompanhar o envio do meu pedido?',
                answer: 'Assim que o pedido for despachado, receberás um código de rastreio por e-mail para acompanhar a entrega em tempo real.',
            },
            {
                question: 'O que acontece se eu não estiver em casa no momento da entrega?',
                answer: 'A transportadora fará uma nova tentativa de entrega. Se não for possível, o pacote ficará disponível para recolha num ponto indicado.',
            },
            {
                question: 'Posso escolher uma transportadora específica?',
                answer: 'No momento, o sistema seleciona automaticamente a transportadora mais adequada, mas estamos a trabalhar para oferecer opções personalizadas.',
            },
            {
                question: 'Fazem entregas internacionais?',
                answer: 'Sim, fazemos entregas para vários países. Os prazos e custos variam conforme a região de destino.',
            },
        ],

        [HelpTabsEnum.DEVOLUTION]: [
            {
                question: 'Como posso devolver um produto?',
                answer: 'Podes solicitar uma devolução no prazo de 14 dias após a entrega, desde que o produto esteja em perfeitas condições e na embalagem original.',
            },
            {
                question: 'As devoluções são gratuitas?',
                answer: 'Sim, oferecemos devoluções gratuitas para produtos com defeito ou erro no envio. Em outros casos, o custo pode ser do cliente.',
            },
            {
                question: 'Quanto tempo demora para receber o reembolso?',
                answer: 'O reembolso é efetuado em até 10 dias úteis após a confirmação da devolução e inspeção do produto.',
            },
            {
                question: 'Posso trocar um produto por outro?',
                answer: 'Sim, podes solicitar uma troca, desde que o produto esteja em bom estado e dentro do prazo de devolução.',
            },
            {
                question: 'Recebi um produto danificado. O que devo fazer?',
                answer: 'Contacta o nosso suporte imediatamente e envia fotos do produto danificado. Vamos resolver o problema o mais rápido possível.',
            },
        ],

        [HelpTabsEnum.OTHERS]: [
            {
                question: 'Como entro em contacto com o suporte?',
                answer: 'Podes contactar-nos através do chat disponível no site, por e-mail ou pelas redes sociais oficiais.',
            },
            {
                question: 'Onde posso deixar sugestões ou reclamações?',
                answer: 'Na secção “Ajuda e Suporte”, há uma área dedicada para feedbacks. A tua opinião é muito importante para nós.',
            },
            {
                question: 'Vocês têm uma aplicação móvel?',
                answer: 'Sim, a nossa app está disponível para Android e iOS. Podes fazer compras, acompanhar pedidos e receber notificações exclusivas.',
            },
            {
                question: 'Como funcionam as promoções e descontos?',
                answer: 'As promoções são exibidas na página inicial e em newsletters. Cada promoção tem regras específicas e prazos limitados.',
            },
            {
                question: 'O site é acessível para pessoas com deficiência?',
                answer: 'Sim, seguimos diretrizes de acessibilidade digital, garantindo navegação adaptada para leitores de ecrã e comandos de voz.',
            },
        ],
    };

    contentByTab(tag: HelpTabsEnum): Observable<any[]> {
        return of(this.contents[tag] ?? []).pipe(delay(2000));
    }

}